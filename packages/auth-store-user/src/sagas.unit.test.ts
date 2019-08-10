import { select, takeLatest } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './actions';
import * as sagas from './sagas';
import {
  actions as authBaseActions,
  selectors,
} from '@shipfirst/auth-store-base';
import { UserData } from './types';

jest.mock('firebase');

describe('@shipfirst/auth-store-user - sagas', () => {
  describe('watchForUserDataUpdate', () => {
    it('puts a success action if channel emits auth data', () => {
      const userData = {
        data: () => ({ foo: 'bar' }),
      };
      return expectSaga(sagas.watchForUserDataUpdate, {
        firestore: () => ({
          collection: () => ({
            doc: () => ({
              onSnapshot: (cb: (p: UserData) => void) => {
                setImmediate(() => {
                  cb(userData);
                });
                return () => {};
              },
            }),
          }),
        }),
      })
        .provide([[select(selectors.getUid), 'uid']])
        .put(actions.syncUserData({ foo: 'bar' }))
        .silentRun(0);
    });
    it('puts a failure action in case of updateAuthFailure', () => {
      const error = new Error();
      return expectSaga(sagas.watchForUserDataUpdate, {
        firestore: () => ({
          collection: () => ({
            doc: () => ({
              onSnapshot: () => {
                return () => {};
              },
            }),
          }),
        }),
      })
        .provide([[select(selectors.getUid), 'uid']])
        .dispatch(authBaseActions.updateAuthFailure(error))
        .put(actions.clearUserData())
        .silentRun(0);
    });
  });
  it('returns if uid is falsy', () => {
    return expectSaga(sagas.watchForUserDataUpdate, {
      firestore: () => ({
        collection: () => ({
          doc: () => ({
            onSnapshot: () => {
              return () => {};
            },
          }),
        }),
      }),
    })
      .provide([[select(selectors.getUid), null]])
      .silentRun(0);
  });
});
describe('signUp', () => {
  it('puts a success action in case of successful sign up', () => {
    return expectSaga(
      sagas.signUp,
      { createUserWithEmailAndPassword: () => {} },
      actions.signUpRequest('email', 'password'),
    )
      .put(actions.signUpSuccess(actions.SIGN_UP))
      .run();
  });
  it('puts a failure action in case of error', () => {
    return expectSaga(
      sagas.signUp,
      {
        createUserWithEmailAndPassword: () => {
          throw new Error('signup');
        },
      },
      actions.signUpRequest('email', 'password'),
    )
      .put(actions.signUpFailure(new Error('signup'), actions.SIGN_UP))
      .run();
  });
});
describe('logIn', () => {
  it('puts a success action in case of successful login', () => {
    return expectSaga(
      sagas.logIn,
      { signInWithCredential: () => {} },
      actions.logInWithEmailAndPasswordRequest('email', 'password'),
    )
      .put(actions.logInSuccess(actions.LOGIN))
      .run();
  });
  it('puts a failure action in case of error', () => {
    return expectSaga(
      sagas.logIn,
      {
        signInWithCredential: () => {
          throw new Error();
        },
      },
      actions.logInWithEmailAndPasswordRequest('email', 'password'),
    )
      .put(actions.logInFailure(new Error(), actions.LOGIN))
      .run();
  });
});
describe('initPasswordReset', () => {
  it('puts a success action in case of successful initPasswordReset', () => {
    return expectSaga(
      sagas.initPasswordReset,
      { sendPasswordResetEmail: () => {} },
      actions.initPasswordResetRequest('email'),
    )
      .put(actions.initPasswordResetSuccess(actions.INIT_PASSWORD_RESET))
      .run();
  });
  it('puts a failure action in case of error', () => {
    return expectSaga(
      sagas.initPasswordReset,
      {
        sendPasswordResetEmail: () => {
          throw new Error();
        },
      },
      actions.initPasswordResetRequest('email'),
    )
      .put(
        actions.initPasswordResetFailure(
          new Error(),
          actions.INIT_PASSWORD_RESET,
        ),
      )
      .run();
  });
});
describe('confirmPasswordReset', () => {
  it('puts a success action in case of successful confirmPasswordReset', () => {
    return expectSaga(
      sagas.confirmPasswordReset,
      { confirmPasswordReset: () => {} },
      actions.confirmPasswordResetRequest('code', 'email'),
    )
      .put(actions.confirmPasswordResetSuccess(actions.CONFIRM_PASSWORD_RESET))
      .run();
  });
  it('puts a failure action in case of error', () => {
    return expectSaga(
      sagas.confirmPasswordReset,
      {
        confirmPasswordReset: () => {
          throw new Error();
        },
      },
      actions.confirmPasswordResetRequest('code', 'email'),
    )
      .put(
        actions.confirmPasswordResetFailure(
          new Error(),
          actions.CONFIRM_PASSWORD_RESET,
        ),
      )
      .run();
  });
});
describe('updateEmail', () => {
  it('puts a success action in case of successful updateEmail', () => {
    return expectSaga(
      sagas.updateEmail,
      {
        currentUser: {
          updateEmail: () => {},
          reauthenticateWithCredential: () => {},
        },
      },
      actions.updateEmailRequest('email', 'password'),
    )
      .put(actions.updateEmailSuccess(actions.UPDATE_EMAIL))
      .run();
  });
  it('puts a failure action in case of missing user', () => {
    return expectSaga(
      sagas.updateEmail,
      { currentUser: null },
      actions.updateEmailRequest('code', 'email'),
    )
      .put(
        actions.updateEmailFailure(
          new Error('auth/missing-current-user'),
          actions.UPDATE_EMAIL,
        ),
      )
      .run();
  });
  it('puts a failure action in case of wrong password', () => {
    return expectSaga(
      sagas.updateEmail,
      {
        currentUser: {
          reauthenticateWithCredential: () => {
            throw new Error('auth/user-mismatch');
          },
        },
      },
      actions.updateEmailRequest('code', 'email'),
    )
      .put(
        actions.updateEmailFailure(
          new Error('auth/user-mismatch'),
          actions.UPDATE_EMAIL,
        ),
      )
      .run();
  });
  it('puts a failure action in case of error', () => {
    return expectSaga(
      sagas.updateEmail,
      {
        currentUser: {
          updateEmail: () => {
            throw new Error('error');
          },
          reauthenticateWithCredential: () => {},
        },
      },
      actions.updateEmailRequest('code', 'email'),
    )
      .put(actions.updateEmailFailure(new Error('error'), actions.UPDATE_EMAIL))
      .run();
  });
});
describe('updatePassword', () => {
  it('puts a success action in case of successful updatePassword', () => {
    return expectSaga(
      sagas.updatePassword,
      {
        currentUser: {
          updatePassword: () => {},
          reauthenticateWithCredential: () => {},
        },
      },
      actions.updatePasswordRequest('oldPassword', 'newPassword'),
    )
      .put(actions.updatePasswordSuccess(actions.UPDATE_PASSWORD))
      .run();
  });
  it('puts a failure action in case of missing user', () => {
    return expectSaga(
      sagas.updatePassword,
      { currentUser: null },
      actions.updatePasswordRequest('oldPassword', 'newPassword'),
    )
      .put(
        actions.updatePasswordFailure(
          new Error('auth/missing-current-user'),
          actions.UPDATE_PASSWORD,
        ),
      )
      .run();
  });
  it('puts a failure action in case of wrong password', () => {
    return expectSaga(
      sagas.updatePassword,
      {
        currentUser: {
          reauthenticateWithCredential: () => {
            throw new Error('auth/user-mismatch');
          },
        },
      },
      actions.updatePasswordRequest('oldPassword', 'newPassword'),
    )
      .put(
        actions.updatePasswordFailure(
          new Error('auth/user-mismatch'),
          actions.UPDATE_PASSWORD,
        ),
      )
      .run();
  });
  it('puts a failure action in case of error', () => {
    return expectSaga(
      sagas.updatePassword,
      {
        currentUser: {
          updatePassword: () => {
            throw new Error('error');
          },
          reauthenticateWithCredential: () => {},
        },
      },
      actions.updatePasswordRequest('oldPassword', 'newPassword'),
    )
      .put(
        actions.updatePasswordFailure(
          new Error('error'),
          actions.UPDATE_PASSWORD,
        ),
      )
      .run();
  });
  describe('logout', () => {
    it('puts a success action in case of successful logout', () => {
      return expectSaga(
        sagas.logOut,
        { signOut: () => {} },
        actions.logOutRequest(),
      )
        .put(actions.logOutSuccess(actions.LOGOUT))
        .run();
    });
    it('puts a failure action in case of error', () => {
      return expectSaga(
        sagas.logOut,
        {
          signOut: () => {
            throw new Error();
          },
        },
        actions.logOutRequest(),
      )
        .put(actions.logOutFailure(new Error(), actions.LOGOUT))
        .run();
    });
  });
  describe('default', () => {
    const auth = {};
    const services = { firebase: { auth: () => auth } };
    it('forks watchForUserDataUpdate on UPDATE_AUTH_SUCCESS actions', () => {
      return expectSaga(sagas.default, services).silentRun(10);
    });
  });
});
