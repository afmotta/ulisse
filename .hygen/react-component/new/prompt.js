const defaultFolder = 'react-components'
const levels = ['atom', 'molecule', 'organism', 'template', 'page']

module.exports = [
  {
    type: 'input',
    name: 'destinationFolder',
    default: defaultFolder,
    message: `What's the destination package folder name? (default ${defaultFolder})`,
  },
  {
    type: 'select',
    name: 'level',
    default: 'atom',
    message: `What's the component level? (${levels.join(', ')})`,
    choices: levels,
  },
]
