import compose from 'lodash/fp/compose';
import { configureStore } from './index';
import { take, put } from 'redux-saga/effects';
import {
  Action,
  Middleware,
  StoreEnhancer,
  AnyAction,
  Reducer,
  DeepPartial,
} from 'redux';
import * as reduxLogger from 'redux-logger';
import * as devTools from 'redux-devtools-extension';
import firebaseApp from 'firebase/app';
import storage from 'redux-persist/lib/storage';

jest.mock('redux-logger');
jest.mock('firebase/app');

describe('configureStore', () => {
  const reducer = (state = { counter: 0 }, action: Action) => ({
    ...state,
    counter: action.type === 'INCREMENT' ? state.counter + 1 : state.counter,
  });

  const saga = function*() {
    yield take('INCREMENT_SAGA');
    yield put({ type: 'INCREMENT' });
  };

  (reduxLogger.createLogger as jest.Mock).mockImplementation(
    () => (store: any) => (next: any) => (action: Action) => next(action),
  );

  jest.spyOn(devTools, 'composeWithDevTools');

  it('should configure the store when passing reducer and saga', () => {
    const { store } = configureStore(reducer, saga);
    expect(store.getState().counter).toBe(0);
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState().counter).toBe(1);
    store.dispatch({ type: 'INCREMENT_SAGA' });
    expect(store.getState().counter).toBe(2);
    expect(reduxLogger.createLogger).toBeCalled();
  });

  it('should not use redux-persist when persist configuration is disabled', () => {
    const { store, persistor } = configureStore(reducer, saga, {
      persist: false,
    });
    expect(persistor).toBe(undefined);
    expect(store.getState()).not.toHaveProperty('_persist');
  });

  it('should use redux-persist with a custom configuration', () => {
    const { store, persistor } = configureStore(reducer, saga, {
      persist: {
        blacklist: ['counter'],
        key: 'testPersist',
        storage,
      },
    });
    expect(persistor).not.toBe(undefined);
    expect(store.getState()).toHaveProperty('_persist');
    if (persistor) {
      expect(persistor.getState().registry[0]).toBe('testPersist');
    }
  });

  it('should not use redux-logger when log configuration is disabled', () => {
    configureStore(reducer, saga, {
      log: false,
    });
    expect(reduxLogger.createLogger).not.toBeCalled();
  });

  it('should use redux-logger with a custom configuration', () => {
    configureStore(reducer, saga, {
      log: {
        level: 'error',
      },
    });
    expect(reduxLogger.createLogger).toHaveBeenCalledWith({ level: 'error' });
  });

  it('should not use devTools when disabled', () => {
    configureStore(reducer, saga, {
      devTools: false,
    });
    expect(devTools.composeWithDevTools).not.toBeCalled();
  });

  it('should use devTools with a custom configuration', () => {
    configureStore(reducer, saga, {
      devTools: {
        name: 'test',
        trace: false,
      },
    });
    expect(devTools.composeWithDevTools).toHaveBeenCalledWith({
      name: 'test',
      trace: false,
    });
  });

  it('should use custom middlewares', () => {
    const noIncrementMiddleware: Middleware = jest.fn(store => next => action =>
      next(action.type === 'INCREMENT' ? next({ type: 'NONE' }) : next(action)),
    );
    const { store } = configureStore(reducer, saga, {
      middlewares: [noIncrementMiddleware],
    });
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState().counter).toBe(0);
  });

  it('should use custom enhancers', () => {
    const noIncrementEnhancer: StoreEnhancer = createStore => <
      S,
      A extends Action = AnyAction
    >(
      reducer: Reducer<S, A>,
      preloadedState: DeepPartial<S> | undefined,
    ) => {
      const wrappedReducer: Reducer<S, A> = (
        state: S | undefined,
        action: A,
      ): S => {
        if (state) {
          return action.type === 'INCREMENT' ? state : reducer(state, action);
        }
        return (<unknown>{ counter: 0 }) as S;
      };
      return createStore(wrappedReducer, preloadedState);
    };

    const { store } = configureStore(reducer, saga, {
      enhancers: [noIncrementEnhancer],
    });
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState().counter).toBe(0);
  });

  it('should not use firebase by default', () => {
    configureStore(reducer, saga);
    expect(firebaseApp.initializeApp).not.toBeCalled();
  });

  it('should use firebase when config is passed', () => {
    configureStore(reducer, saga, {
      firebase: {
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
      },
    });
    expect(firebaseApp.initializeApp).toBeCalled();
  });
});
