import * as glob from 'glob';
import { includes } from 'lodash';

export default (
  extension: string,
  includeNodeModules: boolean = true,
  exclude: string[] = [],
): string[] =>
  glob
    .sync(`**/*.${extension}`)
    .filter(
      file =>
        (includeNodeModules || !includes(file, 'node_modules/')) &&
        !includes(exclude, file),
    );
