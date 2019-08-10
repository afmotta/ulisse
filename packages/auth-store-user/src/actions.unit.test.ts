import firebase from 'firebase';
import * as actions from './actions';

describe('auth-store-base actions', () => {
  describe('updateUserData', () => {
    it('returns an action', () => {
      expect(
        actions.syncUserData({
          foo: 'bar',
        }),
      ).toEqual({
        type: 'USER/SYNC_USER_DATA',
        payload: { foo: 'bar' },
      });
    });
  });
  describe('clearUserData', () => {
    it('returns an action', () => {
      expect(actions.clearUserData()).toEqual({
        type: 'USER/CLEAR_USER_DATA',
      });
    });
  });
  describe('signUp', () => {
    describe('signUpRequest', () => {
      it('returns an action', () => {
        expect(actions.signUpRequest('email', 'password')).toEqual({
          type: actions.SIGN_UP_REQUEST,
          payload: {
            email: 'email',
            password: 'password',
          },
          meta: {
            thunk: actions.SIGN_UP,
          },
        });
      });
    });
    describe('signUpSuccess', () => {
      it('returns an action', () => {
        expect(actions.signUpSuccess('thunk')).toEqual({
          type: actions.SIGN_UP_SUCCESS,
          meta: { thunk: 'thunk' },
        });
      });
    });
    describe('signUpFailure', () => {
      it('returns an action', () => {
        expect(actions.signUpFailure(new Error(), 'thunk')).toEqual({
          type: actions.SIGN_UP_FAILURE,
          payload: new Error(),
          meta: { thunk: 'thunk' },
          error: true,
        });
      });
    });
  });
  describe('logIn', () => {
    describe('logInWithEmailAndPasswordRequest', () => {
      it('returns an action', () => {
        expect(
          actions.logInWithEmailAndPasswordRequest('email', 'password'),
        ).toEqual({
          type: actions.LOGIN_REQUEST,
          payload: {
            credential: firebase.auth.EmailAuthProvider.credential(
              'email',
              'password',
            ),
          },

          meta: {
            thunk: actions.LOGIN,
          },
        });
      });
    });
    describe('logInWithCredentialRequest', () => {
      it('returns an action', () => {
        const credential = firebase.auth.EmailAuthProvider.credential(
          'email',
          'password',
        )
        expect(
          actions.logInWithCredentialRequest(credential),
        ).toEqual({
          type: actions.LOGIN_REQUEST,
          payload: { credential },
          meta: {
            thunk: actions.LOGIN,
          },
        });
      });
    });
    describe('logInSuccess', () => {
      it('returns an action', () => {
        expect(actions.logInSuccess('thunk')).toEqual({
          type: actions.LOGIN_SUCCESS,
          meta: { thunk: 'thunk' },
        });
      });
    });
    describe('logInFailure', () => {
      it('returns an action', () => {
        expect(actions.logInFailure(new Error(), 'thunk')).toEqual({
          type: actions.LOGIN_FAILURE,
          payload: new Error(),
          meta: { thunk: 'thunk' },
          error: true,
        });
      });
    });
  });
  describe('initPasswordReset', () => {
    describe('initPasswordResetRequest', () => {
      it('returns an action', () => {
        expect(actions.initPasswordResetRequest('email')).toEqual({
          type: actions.INIT_PASSWORD_RESET_REQUEST,
          payload: {
            email: 'email',
          },
          meta: {
            thunk: actions.INIT_PASSWORD_RESET,
          },
        });
      });
    });
    describe('initPasswordResetSuccess', () => {
      it('returns an action', () => {
        expect(actions.initPasswordResetSuccess('thunk')).toEqual({
          type: actions.INIT_PASSWORD_RESET_SUCCESS,
          meta: { thunk: 'thunk' },
        });
      });
    });
    describe('initPasswordResetFailure', () => {
      it('returns an action', () => {
        expect(actions.initPasswordResetFailure(new Error(), 'thunk')).toEqual({
          type: actions.INIT_PASSWORD_RESET_FAILURE,
          payload: new Error(),
          meta: { thunk: 'thunk' },
          error: true,
        });
      });
    });
  });
  describe('confirmPasswordReset', () => {
    describe('confirmPasswordResetRequest', () => {
      it('returns an action', () => {
        expect(actions.confirmPasswordResetRequest('code', 'email')).toEqual({
          type: actions.CONFIRM_PASSWORD_RESET_REQUEST,
          payload: {
            code: 'code',
            email: 'email',
          },
          meta: {
            thunk: actions.CONFIRM_PASSWORD_RESET,
          },
        });
      });
    });
    describe('confirmPasswordResetSuccess', () => {
      it('returns an action', () => {
        expect(actions.confirmPasswordResetSuccess('thunk')).toEqual({
          type: actions.CONFIRM_PASSWORD_RESET_SUCCESS,
          meta: { thunk: 'thunk' },
        });
      });
    });
    describe('confirmPasswordResetFailure', () => {
      it('returns an action', () => {
        expect(
          actions.confirmPasswordResetFailure(new Error(), 'thunk'),
        ).toEqual({
          type: actions.CONFIRM_PASSWORD_RESET_FAILURE,
          payload: new Error(),
          meta: { thunk: 'thunk' },
          error: true,
        });
      });
    });
  });
  describe('updateEmail', () => {
    describe('updateEmailRequest', () => {
      it('returns an action', () => {
        expect(actions.updateEmailRequest('password', 'email')).toEqual({
          type: actions.UPDATE_EMAIL_REQUEST,
          payload: {
            password: 'password',
            email: 'email',
          },
          meta: {
            thunk: actions.UPDATE_EMAIL,
          },
        });
      });
    });
    describe('updateEmailSuccess', () => {
      it('returns an action', () => {
        expect(actions.updateEmailSuccess('thunk')).toEqual({
          type: actions.UPDATE_EMAIL_SUCCESS,
          meta: { thunk: 'thunk' },
        });
      });
    });
    describe('updateEmailFailure', () => {
      it('returns an action', () => {
        expect(actions.updateEmailFailure(new Error(), 'thunk')).toEqual({
          type: actions.UPDATE_EMAIL_FAILURE,
          payload: new Error(),
          meta: { thunk: 'thunk' },
          error: true,
        });
      });
    });
  });
  describe('updatePassword', () => {
    describe('updatePasswordRequest', () => {
      it('returns an action', () => {
        expect(
          actions.updatePasswordRequest('oldPassword', 'newPassword'),
        ).toEqual({
          type: actions.UPDATE_PASSWORD_REQUEST,
          payload: {
            oldPassword: 'oldPassword',
            newPassword: 'newPassword',
          },
          meta: {
            thunk: actions.UPDATE_PASSWORD,
          },
        });
      });
    });
    describe('updatePasswordSuccess', () => {
      it('returns an action', () => {
        expect(actions.updatePasswordSuccess('thunk')).toEqual({
          type: actions.UPDATE_PASSWORD_SUCCESS,
          meta: { thunk: 'thunk' },
        });
      });
    });
    describe('updatePasswordFailure', () => {
      it('returns an action', () => {
        expect(actions.updatePasswordFailure(new Error(), 'thunk')).toEqual({
          type: actions.UPDATE_PASSWORD_FAILURE,
          payload: new Error(),
          meta: { thunk: 'thunk' },
          error: true,
        });
      });
    });
  });
  describe('updateUserData', () => {
    describe('updateUserDataRequest', () => {
      it('returns an action', () => {
        expect(actions.updateUserDataRequest({ foo: 'bar' })).toEqual({
          type: actions.UPDATE_USER_DATA_REQUEST,
          payload: {
            userData: { foo: 'bar' },
          },
          meta: {
            thunk: actions.UPDATE_USER_DATA,
          },
        });
      });
    });
    describe('updateUserDataSuccess', () => {
      it('returns an action', () => {
        expect(actions.updateUserDataSuccess('thunk')).toEqual({
          type: actions.UPDATE_USER_DATA_SUCCESS,
          meta: { thunk: 'thunk' },
        });
      });
    });
    describe('updateUserDataFailure', () => {
      it('returns an action', () => {
        expect(actions.updateUserDataFailure(new Error(), 'thunk')).toEqual({
          type: actions.UPDATE_USER_DATA_FAILURE,
          payload: new Error(),
          meta: { thunk: 'thunk' },
          error: true,
        });
      });
    });
  });
  describe('logOut', () => {
    describe('logOutRequest', () => {
      it('returns an action', () => {
        expect(actions.logOutRequest()).toEqual({
          type: actions.LOGOUT_REQUEST,
          meta: {
            thunk: actions.LOGOUT,
          },
        });
      });
    });
    describe('logOutSuccess', () => {
      it('returns an action', () => {
        expect(actions.logOutSuccess('thunk')).toEqual({
          type: actions.LOGOUT_SUCCESS,
          meta: { thunk: 'thunk' },
        });
      });
    });
    describe('logOutFailure', () => {
      it('returns an action', () => {
        expect(actions.logOutFailure(new Error(), 'thunk')).toEqual({
          type: actions.LOGOUT_FAILURE,
          payload: new Error(),
          meta: { thunk: 'thunk' },
          error: true,
        });
      });
    });
  });
});
