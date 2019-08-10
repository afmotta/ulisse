const path = require('path')
const { lstatSync, readdirSync } = require('fs')

const projectBaseFolder = path.resolve(__dirname, '../')
const packagesBasePath = path.resolve(__dirname, '../', 'packages')
const packages = readdirSync(packagesBasePath).filter(name =>
  lstatSync(path.join(packagesBasePath, name)).isDirectory(),
)

const excludedFolders = [
  path.resolve(projectBaseFolder, 'node_modules'),
].concat(
  packages.map(name => path.resolve(packagesBasePath, name, 'node_modules')),
)

module.exports = ({ baseConfig, env, config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: excludedFolders,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')
  Object.assign(config.resolve.alias, {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@shipfirst/${name}`]: path.join(packagesBasePath, name, 'src'),
      }),
      {},
    ),
  })

  return config
}
