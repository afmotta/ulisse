import { expectSaga } from 'redux-saga-test-plan';
import * as actions from './actions';
import * as sagas from './sagas';
import { AuthData } from './types';

describe('watchForAuthUpdate', () => {
  it('puts a success action if channel emits auth data', () => {
    const authData = {
      isAnonymous: true,
      uid: 'string',
      email: 'string',
      emailVerified: false,
    };
    return expectSaga(sagas.watchForAuthUpdate, {
      auth: () => ({
        onAuthStateChanged: (onAuth: (p: AuthData) => void) => {
          setImmediate(() => {
            onAuth(authData);
          });
          return () => {};
        },
      }),
    })
      .put(actions.updateAuthSuccess(authData))
      .silentRun(0);
  });
  it('puts a failure action if channel emits error', () => {
    const error = new Error();
    return expectSaga(sagas.watchForAuthUpdate, {
      auth: () => ({
        onAuthStateChanged: (_: any, onError: (p: Error) => void) => {
          setImmediate(() => {
            onError(error);
          });
          return () => {};
        },
      }),
    })
      .put(actions.updateAuthFailure(error))
      .silentRun(0);
  });
});
