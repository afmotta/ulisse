import * as fs from 'fs'
import * as _ from 'lodash'
import * as fp from 'lodash/fp'
import finder from './finder'
import * as path from 'path'
import * as spawn from 'cross-spawn'
import * as hb from 'handlebars'

require('dotenv-flow').config()

const namespace = (uri: string): string => path.basename(uri).split(/\./)[0]

const getCurrentConf = () =>
  JSON.parse(spawn.sync('firebase', ['functions:config:get']).stdout.toString())

const bindEnv = fp.flow(
  JSON.stringify,
  hb.compile,
  compiler => compiler(process.env),
  JSON.parse,
)

const getLeaves = (tree: Object): string[] => {
  var leaves: string[] = []
  var walk = (obj: any, path: string) => {
    path = path || ''
    for (let key in obj) {
      const newPath = `${path && `${path}.`}${key}`
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' || obj[key] instanceof Array) {
          walk(obj[key], newPath)
        } else {
          leaves.push(newPath)
        }
      }
    }
  }
  walk(tree, '')
  return leaves
}

export const compiler = (includeNodeModules: boolean, excludes: string[]) => {
  const uris = finder('functions.config.json', includeNodeModules, [
    'firestore.rules',
    ...excludes,
  ])
  console.log(`\nBuilding functions.config.json from:`)
  uris.forEach(path => console.log(`\t- ${path}`))
  const configs = uris.map(uri => ({
    [namespace(uri)]: require(`${process.cwd()}/${uri}`),
  }))
  const config = bindEnv(_.merge({}, ...configs))
  fs.writeFileSync('functions.config.json', JSON.stringify(config))
  console.log(`\nBuilt functions.config.json from ${uris.length} files`)
}

export const deploy = () => {
  const config = require(`${process.cwd()}/functions.config.json`)
  const currentConfig = getCurrentConf()
  const newPaths = getLeaves(config)
  const currentPaths = getLeaves(currentConfig)
  const keysToDelete = _.without(currentPaths, ...newPaths)
  const keysToSet = newPaths
    .filter(path => !_.includes(keysToDelete, path))
    // this is intentionally set to != instead of !== because all values are strings on firebase
    .filter(path => _.get(config, path) != _.get(currentConfig, path))
  console.log('Deploying functions configuration')
  if (keysToDelete.length === 0 && keysToSet.length === 0) {
    console.log('Configuration is already up to date')
  }

  keysToDelete.forEach(key => {
    console.log(`Deleting key ${key}`)
    spawn.sync('firebase', ['functions:config:unset', key], {
      stdio: 'inherit',
    })
  })
  keysToSet.forEach(key => {
    console.log(`Setting key ${key}`)
    spawn.sync(
      'firebase',
      ['functions:config:set', `${key}=${_.get(config, key)}`],
      {
        stdio: 'inherit',
      },
    )
  })
}
