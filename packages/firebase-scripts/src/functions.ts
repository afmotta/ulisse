import * as spawn from 'cross-spawn';
import dotenvFlow from 'dotenv-flow';
import * as fs from 'fs';
import * as hb from 'handlebars';
import _ from 'lodash';
import * as fp from 'lodash/fp';
import * as path from 'path';
import finder from './finder';

dotenvFlow.config();

const namespace = (uri: string): string => path.basename(uri).split(/\./)[0];

const getCurrentConf = () =>
  JSON.parse(
    spawn.sync('firebase', ['functions:config:get']).stdout.toString(),
  );

const bindEnv = fp.flow(
  JSON.stringify,
  hb.compile,
  _compiler => _compiler(process.env),
  JSON.parse,
);

const getLeaves = (tree: object): string[] => {
  const leaves: string[] = [];
  const walk = (obj: any, filePath: string) => {
    filePath = filePath || '';
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newPath = `${path && `${path}.`}${key}`;
        if (typeof obj[key] === 'object' || obj[key] instanceof Array) {
          walk(obj[key], newPath);
        } else {
          leaves.push(newPath);
        }
      }
    }
  };
  walk(tree, '');
  return leaves;
};

export const compiler = (includeNodeModules: boolean, excludes: string[]) => {
  const uris = finder('functions.config.json', includeNodeModules, [
    'firestore.rules',
    ...excludes,
  ]);
  console.log('\nBuilding functions.config.json from:');
  uris.forEach(_path => console.log(`\t- ${_path}`));
  const configs = uris.map(uri => ({
    [namespace(uri)]: require(`${process.cwd()}/${uri}`),
  }));
  const config = bindEnv(_.merge({}, ...configs));
  fs.writeFileSync('functions.config.json', JSON.stringify(config));
  console.log(`\nBuilt functions.config.json from ${uris.length} files`);
};

export const deploy = () => {
  const config = require(`${process.cwd()}/functions.config.json`);
  const currentConfig = getCurrentConf();
  const newPaths = getLeaves(config);
  const currentPaths = getLeaves(currentConfig);
  const keysToDelete = _.without(currentPaths, ...newPaths);
  const keysToSet = newPaths
    .filter(_path => !_.includes(keysToDelete, _path))
    .filter(
      _path => _.get(config, _path).toString() !== _.get(currentConfig, _path),
    );
  console.log('Deploying functions configuration');
  if (keysToDelete.length === 0 && keysToSet.length === 0) {
    console.log('Configuration is already up to date');
  }

  keysToDelete.forEach(key => {
    console.log(`Deleting key ${key}`);
    spawn.sync('firebase', ['functions:config:unset', key], {
      stdio: 'inherit',
    });
  });
  keysToSet.forEach(key => {
    console.log(`Setting key ${key}`);
    spawn.sync(
      'firebase',
      ['functions:config:set', `${key}=${_.get(config, key)}`],
      {
        stdio: 'inherit',
      },
    );
  });
};
