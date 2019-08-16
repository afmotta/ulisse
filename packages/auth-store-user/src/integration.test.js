import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as authBase from '@shipfirst/auth-store-base';
import reducer, { KEY, initialState } from './reducer';
import rootSaga from './sagas';
import * as selectors from './selectors';
import createSagaMiddleware from 'redux-saga';

authBase.selectors.getUid = jest.fn(() => 'UID');

describe('auth-store-user', () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({ [KEY]: reducer }),
    {},
    applyMiddleware(sagaMiddleware),
  );
  const userData = {
    foo: 'bar',
  };
  const authData = {
    isAnonymous: true,
    uid: 'string',
    email: 'string',
    emailVerified: false,
  };
  let fireSnapshot;
  const firebaseMock = {
    auth: () => ({}),
    firestore: () => ({
      collection: () => ({
        doc: () => ({
          onSnapshot: emit => {
            fireSnapshot = data => emit({ data: () => data });
            return () => {};
          },
        }),
      }),
    }),
  };

  sagaMiddleware.run(rootSaga, {
    firebase: firebaseMock,
  });
  it('the store updates when updateAuthSuccess is dispatched', () => {
    expect(selectors.getUserData(store.getState())).toEqual({});
    store.dispatch(authBase.actions.updateAuthSuccess(authData));
    fireSnapshot(userData);
    expect(selectors.getUserData(store.getState())).toEqual(userData);
  });

  it('the store updates when updateAuthFailure is dispatched', () => {
    store.dispatch(authBase.actions.updateAuthFailure(new Error()));
    expect(selectors.getUserData(store.getState())).toEqual({});
  });
});
