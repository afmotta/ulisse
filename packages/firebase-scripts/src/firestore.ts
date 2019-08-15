import * as hb from 'handlebars'
import * as fs from 'fs'
import finder from './finder'

const template = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
{{#each rules}}
    {{{this}}}
{{/each}}
  }
}
`

const compiled = hb.compile(template, { preventIndent: false })

const compiler = (rules: string[]): string => compiled({ rules })

export default (includeNodeModules: boolean, excludes: string[]) => {
  const paths = finder('rules', includeNodeModules, [
    'firestore.rules',
    ...excludes,
  ])
  console.log(`\nBuilding firestore.rules from:`)
  paths.forEach(path => console.log(`\t- ${path}`))
  const rules = paths.map(path => fs.readFileSync(path, { encoding: 'utf-8' }))
  const rulesContent = compiler(rules)

  fs.writeFileSync('firestore.rules', rulesContent)
  console.log(`\nBuilt firestore.rules from ${paths.length} files`)
}
