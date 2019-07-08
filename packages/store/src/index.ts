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
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';

export interface Types {}

export type RootState = Types extends { RootState: infer T } ? T : any;

/**
 * Options for `configureStore()`.
 */
export interface ConfigureStoreOptions<S = any, A extends Action = AnyAction> {
  /**
   * A single reducer function that will be used as the root reducer.
   */
  reducer: Reducer<S, A>;

  /*
   * A single saga that is run on the middleware
   */
  saga: Saga<any[]>;

  /**
   * An array of Redux middleware to install.
   */
  middlewares?: Middleware<{}, S>[];

  /*
   * Devtols configuration. Use 'true' for the default configuration,
   * or an object to pass custom configuration.
   */
  devTools?: boolean | EnhancerOptions;

  /*
   * Whether to add a pesistance layer to the store. Use boolean for a default opinionated configuration
   or an Object for custom configuration.
   */
  persist?: boolean | PersistConfig;

  /*
   * Whether to use redux logger. Use boolean for a default opinionated configuration
   * or an object for custom configuration.
   */
  log?: boolean | ReduxLoggerOptions;

  /**
   * The store enhancers to apply.
   */
  enhancers?: StoreEnhancer[];
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
  config: ConfigureStoreOptions<S, A>,
): {
  store: Store<S, A>;
  persistor: Persistor | undefined;
} => {
  const {
    reducer,
    saga,
    middlewares: userMiddlewares = [],
    enhancers = [],
    devTools = true,
    persist = true,
    log = true,
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
  sagaMiddleware.run(saga);
  return { store, persistor };
};

export { ConnectedApp } from './ConnectedApp';
