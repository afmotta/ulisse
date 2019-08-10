import { ActionType } from 'typesafe-actions';
import { eventChannel } from 'redux-saga';
import {
  call,
  cancelled,
  race,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import fb from 'firebase';
import {
  actions as authBaseActions,
  selectors as authBaseSelectors,
} from '@shipfirst/auth-store-base';
import * as actions from './actions';

export function* watchForUserDataUpdate(firebase: fb.app.App) {
  const uid = yield select(authBaseSelectors.getUid);
  if (!uid) {
    return;
  }
  const ref = firebase
    .firestore()
    .collection('users')
    .doc(uid);
  const channel = eventChannel(emit => ref.onSnapshot(emit));
  try {
    while (true) {
      const { newData, error } = yield race({
        newData: take(channel),
        error: take(authBaseActions.UPDATE_AUTH_FAILURE),
        clear: take(actions.CLEAR_USER_DATA),
      });
      if (newData) {
        yield put(actions.syncUserData(newData.data()));
      } else {
        if (error) {
          yield put(actions.clearUserData());
        }
        channel.close();
        break;
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function* signUp(
  auth: fb.auth.Auth,
  action: ActionType<typeof actions.signUpRequest>,
) {
  try {
    yield call(
      [auth, auth.createUserWithEmailAndPassword],
      action.payload.email,
      action.payload.password,
    );
    yield put(actions.signUpSuccess(action.meta.thunk));
  } catch (e) {
    yield put(actions.signUpFailure(e, action.meta.thunk));
  }
}

export function* logIn(
  auth: fb.auth.Auth,
  action: ActionType<typeof actions.logInWithCredentialRequest>,
) {
  try {
    yield call([auth, auth.signInWithCredential], action.payload.credential);
    yield put(actions.logInSuccess(action.meta.thunk));
  } catch (e) {
    yield put(actions.logInFailure(e, action.meta.thunk));
  }
}

export function* initPasswordReset(
  auth: fb.auth.Auth,
  action: ActionType<typeof actions.initPasswordResetRequest>,
) {
  try {
    yield call([auth, auth.sendPasswordResetEmail], action.payload.email);
    yield put(actions.initPasswordResetSuccess(action.meta.thunk));
  } catch (e) {
    yield put(actions.initPasswordResetFailure(e, action.meta.thunk));
  }
}

export function* confirmPasswordReset(
  auth: fb.auth.Auth,
  action: ActionType<typeof actions.confirmPasswordResetRequest>,
) {
  try {
    yield call(
      [auth, auth.confirmPasswordReset],
      action.payload.code,
      action.payload.email,
    );
    yield put(actions.confirmPasswordResetSuccess(action.meta.thunk));
  } catch (e) {
    yield put(actions.confirmPasswordResetFailure(e, action.meta.thunk));
  }
}

export function* updateEmail(
  auth: fb.auth.Auth,
  action: ActionType<typeof actions.updateEmailRequest>,
) {
  try {
    if (auth.currentUser !== null && auth.currentUser.email !== null) {
      const credential = fb.auth.EmailAuthProvider.credential(
        auth.currentUser.email,
        action.payload.password,
      );
      yield call(
        [auth.currentUser, auth.currentUser.reauthenticateWithCredential],
        credential,
      );
      yield call(
        [auth.currentUser, auth.currentUser.updateEmail],
        action.payload.email,
      );
      yield put(actions.updateEmailSuccess(action.meta.thunk));
    } else {
      throw new Error('auth/missing-current-user');
    }
  } catch (e) {
    yield put(actions.updateEmailFailure(e, action.meta.thunk));
  }
}

export function* updatePassword(
  auth: fb.auth.Auth,
  action: ActionType<typeof actions.updatePasswordRequest>,
) {
  try {
    if (auth.currentUser !== null && auth.currentUser.email !== null) {
      const credential = fb.auth.EmailAuthProvider.credential(
        auth.currentUser.email,
        action.payload.oldPassword,
      );
      yield call(
        [auth.currentUser, auth.currentUser.reauthenticateWithCredential],
        credential,
      );
      yield call(
        [auth.currentUser, auth.currentUser.updatePassword],
        action.payload.newPassword,
      );
      yield put(actions.updatePasswordSuccess(action.meta.thunk));
    } else {
      throw new Error('auth/missing-current-user');
    }
  } catch (e) {
    yield put(actions.updatePasswordFailure(e, action.meta.thunk));
  }
}

export function* logOut(
  auth: fb.auth.Auth,
  action: ActionType<typeof actions.logOutRequest>,
) {
  try {
    yield call([auth, auth.signOut]);
    yield put(actions.logOutSuccess(action.meta.thunk));
  } catch (e) {
    yield put(actions.logOutFailure(e, action.meta.thunk));
  }
}

export default function* root({ firebase }: { firebase: fb.app.App }) {
  const auth = firebase.auth();
  yield takeLatest(
    authBaseActions.UPDATE_AUTH_SUCCESS,
    watchForUserDataUpdate,
    firebase,
  );
  yield takeLatest(actions.SIGN_UP_REQUEST, signUp, auth);
  yield takeLatest(actions.LOGIN_REQUEST, logIn, auth);
  yield takeLatest(
    actions.INIT_PASSWORD_RESET_REQUEST,
    initPasswordReset,
    auth,
  );
  yield takeLatest(
    actions.CONFIRM_PASSWORD_RESET_REQUEST,
    confirmPasswordReset,
    auth,
  );
  yield takeLatest(actions.UPDATE_EMAIL_REQUEST, updateEmail, auth);
  yield takeLatest(actions.UPDATE_PASSWORD_REQUEST, updatePassword, auth);
  yield takeLatest(actions.LOGOUT_REQUEST, logOut, auth);
}
