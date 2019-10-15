# Ulisse

## Create a new redux module

Using Hygen, we can create a new redux module with the command

```sh
$ yarn new:redux
```

and following the instructions.

## Create a new React component

Using Hygen, we can create a new React component with the command

```sh
$ yarn new:react-component <component_name>
```

and following the instructions.

# Monorepo

Note that this repo has been forked to demonstrate adding a create-react-app based application to the repo.

The first time you clone the repo you need to install the dependencies and bootstrap the lerna mono-repo.
For doing it run in the shell the command:

```sh
$ yarn install:bootstrap
```

To clean and install the dependencies, build the libraries and run the test, execute:

```sh
$ yarn clean:install && yarn build:declarations && yarn build && yarn test
```

Then the ui can be built:

```sh
$ yarn build:ui
```

UI test can be run with

```sh
$ yarn test:ui
```

Note that this fails currently!

### Storybook

In order to run storybook execute in the root folder

```sh
$ yarn storybook
```

To change the theme used by the library you need to edit the file `.storybook/config.tsx`, specifically at line

```
import { primaryTheme } from '../packages/components/src/themes'
```

The library themes are defined into the package `@ulisse/react-components`
