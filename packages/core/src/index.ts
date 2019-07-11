import {
  createStore,
  Reducer,
  applyMiddleware,
  Action,
  AnyAction,
  Store,
  compose,
  StoreEnhancer,
  Middleware,
} from 'redux';
import { composeWithDevTools, EnhancerOptions } from 'redux-devtools-extension';
import { createLogger, ReduxLoggerOptions } from 'redux-logger';
import {
  persistStore,
  persistReducer,
  PersistConfig,
  Persistor,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import firebaseApp from 'firebase/app';

export interface Types {}

export type RootState = Types extends { RootState: infer T } ? T : any;

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
};

/**
 * Options for `configureStore()`.
 */
export interface ConfigureStoreOptions<S = any, A extends Action = AnyAction> {
  /*
   * Devtols configuration. Use 'true' for the default configuration,
   * or an object to pass custom configuration.
   */
  devTools?: boolean | EnhancerOptions;

  /**
   * The store enhancers to apply.
   */
  enhancers?: StoreEnhancer[];

  /**
   * Wether to use firebase as a service
   */
  firebase?: FirebaseConfig | undefined;

  /*
   * Whether to use redux logger. Use boolean for a default opinionated configuration
   * or an object for custom configuration.
   */
  log?: boolean | ReduxLoggerOptions;

  /**
   * An array of Redux middleware to install.
   */
  middlewares?: Middleware<{}, S>[];

  /*
   * Whether to add a pesistance layer to the store. Use boolean for a default opinionated configuration
   or an Object for custom configuration.
   */
  persist?: boolean | PersistConfig;
}

/**
 * An opinionated method for creating a store and running redux saga.
 *
 * @param config The store configuration.
 * @returns A configured Redux store.
 */

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const DEFAULT_PERSIST_CONFIG = {
  key: 'store',
  storage,
};

export const configureStore = <S = any, A extends Action = AnyAction>(
  reducer: Reducer<S, A>,
  saga: Saga<any[]>,
  config: ConfigureStoreOptions<S, A> = {},
): {
  store: Store<S, A>;
  persistor: Persistor | undefined;
} => {
  const {
    devTools = true,
    enhancers = [],
    firebase,
    log = true,
    middlewares: userMiddlewares = [],
    persist = true,
  } = config;
  let finalCompose = compose;

  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware<{}, S>[] = [
    ...userMiddlewares,
    thunkMiddleware,
    sagaMiddleware,
  ];

  if (!IS_PRODUCTION && devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: true,
      ...(typeof devTools === 'object' && devTools),
    });
  }

  if (!IS_PRODUCTION && log) {
    middlewares.push(createLogger(typeof log === 'object' ? log : {}));
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer, ...enhancers];

  const composedEnhancer = finalCompose(...storeEnhancers) as StoreEnhancer;

  let store;
  let persistor;

  if (persist) {
    const rootReducer = persistReducer(
      typeof persist === 'object' ? persist : DEFAULT_PERSIST_CONFIG,
      reducer,
    );
    store = createStore(rootReducer, undefined, composedEnhancer);
    persistor = persistStore(store);
  } else {
    store = createStore(reducer, undefined, composedEnhancer);
  }
  const services = {
    firebase: firebase && firebaseApp.initializeApp(firebase),
  };
  sagaMiddleware.run(saga, services);
  return { store, persistor };
};

export { ConnectedApp } from './ConnectedApp';
