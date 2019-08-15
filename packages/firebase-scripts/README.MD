# Firebase Scripts

Collection of scripts to integrate the Firebase CLI. It manages splitting configuration (e,g,. firestore rules and cloud functions configuration) to multiple locations to enable better code separation.

To run the script, launch

`firebase-scripts`

it will compile firestore rules and cloud functions configuration and will deploy using firebase cli.

The configuration is stored in a .firebase-scripts-rc file in the project directory.

## Firestore Rules

It will search for \*.rules file throughout the project and build them in a single firestore.rules file in the home of the project. This file can be deployed using the standard firebase cli.

an example of \*.rules file is:

```
match /users/{document=**} {
    allow read, write: if request.auth.uid != null;
}
```

### Configuration

in the .firebase-scripts-rc you can specify a list of files to exlucde and whether to include node_modules folder in the search

```
  firestore: {
    rules: {
      includeNodesModules: true,
      excludes: [],
    },
  },
```

## Cloud functions variables

It will search for \*.functions.config.json file and will build a configuration file that can be deployed to firebase. The configuration is prefixed with the first part of the file name. For example, the configuration in the file auth.functions.config.json:

```
    {
        "api_key": "1234"
    }
```

will be prefixed with "auth"

```
    {
        "auth": {
            "api_key": "1234"
        }
    }
```

and the key deployed to firebase will be

`auth.api_key`

### Using different environments

firebase-scripts can build the configuration file reading specific configuration from the current Node environemnt (using dotenv-flow package). For Example, to specify a different Api key for development and for production you can include an env variable in a triple {

```
    {
        "auth": {
            "api_key": {{{API_KEY}}}
        }
    }
```

and create two different environment file (.env.development and .env.production)

```
API_KEY=1234
```

See https://github.com/kerimdzhanov/dotenv-flow for more details.

### Configuration

in the .firebase-scripts-rc you can specify a list of files to exlucde and whether to include node_modules folder in the search

```
  firestore: {
    rules: {
      includeNodesModules: true,
      excludes: [],
    },
  },
```

### Deploy

During the deploy phase, firebase-scripts will use Firebase CLI to download the current configuration and will perform the actions (set and unset )to deploy the new conifguration.
