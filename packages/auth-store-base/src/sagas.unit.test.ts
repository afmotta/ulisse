import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './actions';
import * as sagas from './sagas';
import { AuthData } from './types';

describe('auth-store-base sagas', () => {
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
    it('performs anonymous login if auth data is null', () => {
      const authData = null;
      const signInAnonymously = jest.fn();
      return expectSaga(sagas.watchForAuthUpdate, {
        auth: () => ({
          signInAnonymously,
          onAuthStateChanged: (onAuth: (p: null) => void) => {
            setImmediate(() => {
              onAuth(authData);
            });
            return () => {};
          },
        }),
      })
        .silentRun(0)
        .then(() => {
          expect(signInAnonymously).toHaveBeenCalled();
        });
    });
  });
  describe('root', () => {
    it('forks watchForAuthUpdate', () => {
      const services = { firebase: {} };
      return expectSaga(sagas.default, services)
        .provide([[matchers.fork.fn(sagas.watchForAuthUpdate), {}]])
        .fork(sagas.watchForAuthUpdate, {})
        .run();
    });
  });
});
