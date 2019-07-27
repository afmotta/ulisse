import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducer, { KEY, initialState } from './reducer';
import authSaga from './sagas';
import * as selectors from './selectors';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { AuthData } from './types';

describe('auth-store-base', () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({ [KEY]: reducer }),
    {},
    applyMiddleware(sagaMiddleware),
  );
  const authData = {
    isAnonymous: true,
    uid: 'string',
    email: 'string',
    emailVerified: false,
  };
  let fireAuthDataEvent: () => void;
  let fireErrorEvent: () => void;
  const firebaseMock = {
    auth: () => ({
      onAuthStateChanged: (onAuth: (p: AuthData) => void, onError: (p: Error) => void) => {
        fireAuthDataEvent = () => onAuth(authData);
        fireErrorEvent = () => onError(new Error())
        return () => {};
      },
    }),
  };
  sagaMiddleware.run(authSaga, { firebase: firebaseMock });
  it('the store updates when updateAuthSuccess is dispatched', () => {
    expect(selectors.getIsAuthenticated(store.getState())).toEqual(false);
    expect(selectors.getAuthData(store.getState())).toEqual(initialState.authData)
    fireAuthDataEvent();
    expect(selectors.getIsAuthenticated(store.getState())).toEqual(true);
    expect(selectors.getAuthData(store.getState())).toEqual(authData);
  });
  it('the store updates when updateAuthFailure is dispatched', () => {
    expect(selectors.getIsAuthenticated(store.getState())).toEqual(true);
    expect(selectors.getAuthData(store.getState())).toEqual(authData);
    fireErrorEvent();
    expect(selectors.getIsAuthenticated(store.getState())).toEqual(false);
    expect(selectors.getAuthData(store.getState())).toEqual(initialState.authData)
  });
});
