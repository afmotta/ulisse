#!/usr/bin/env node
import firestoreConfig from './firestore'
import {
  compiler as compileFunctionsConfig,
  deploy as deployFunctionsConfig,
} from './functions'

var conf = require('rc')('firebase-scripts-', {
  firestore: {
    rules: {
      includeNodesModules: true,
      excludes: [],
    },
  },
  functions: {
    config: {
      includeNodesModules: true,
      excludes: [],
    },
  },
})

firestoreConfig(
  conf.firestore.rules.includeNodesModules,
  conf.firestore.rules.excludes,
)
compileFunctionsConfig(
  conf.functions.config.includeNodesModules,
  conf.functions.config.excludes,
)
deployFunctionsConfig()
