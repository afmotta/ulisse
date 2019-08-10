import { createStandardAction } from 'typesafe-actions';
import firebase from 'firebase';
import { UserData } from './types';

export const SYNC_USER_DATA = 'USER/SYNC_USER_DATA';
export const syncUserData = createStandardAction(SYNC_USER_DATA)<UserData>();

export const CLEAR_USER_DATA = 'USER/CLEAR_USER_DATA';
export const clearUserData = createStandardAction(CLEAR_USER_DATA)();

export const SIGN_UP = 'USER/SIGN_UP';
export const SIGN_UP_REQUEST = 'USER/SIGN_UP/REQUEST';
export const SIGN_UP_SUCCESS = 'USER/SIGN_UP/SUCCESS';
export const SIGN_UP_FAILURE = 'USER/SIGN_UP/FAILURE';
export const signUpRequest = createStandardAction(SIGN_UP_REQUEST).map(
  (email: string, password: string) => ({
    payload: { email, password },
    meta: { thunk: SIGN_UP },
  }),
);

export const signUpSuccess = createStandardAction(SIGN_UP_SUCCESS).map(
  (thunk: string) => ({
    meta: { thunk },
  }),
);

export const signUpFailure = createStandardAction(SIGN_UP_FAILURE).map(
  (error: Error, thunk: string) => ({
    payload: error,
    error: true,
    meta: { thunk },
  }),
);

export const LOGIN = 'USER/LOGIN';
export const LOGIN_REQUEST = 'USER/LOGIN/REQUEST';
export const LOGIN_SUCCESS = 'USER/LOGIN/SUCCESS';
export const LOGIN_FAILURE = 'USER/LOGIN/FAILURE';
export const logInWithEmailAndPasswordRequest = createStandardAction(
  LOGIN_REQUEST,
).map((email: string, password: string) => ({
  payload: {
    credential: firebase.auth.EmailAuthProvider.credential(email, password),
  },
  meta: { thunk: LOGIN },
}));

export const logInWithCredentialRequest = createStandardAction(
  LOGIN_REQUEST,
).map((credential: firebase.auth.AuthCredential) => ({
  payload: { credential },
  meta: { thunk: LOGIN },
}));

export const logInSuccess = createStandardAction(LOGIN_SUCCESS).map(
  (thunk: string) => ({
    meta: { thunk },
  }),
);

export const logInFailure = createStandardAction(LOGIN_FAILURE).map(
  (error: Error, thunk: string) => ({
    payload: error,
    error: true,
    meta: { thunk },
  }),
);

export const INIT_PASSWORD_RESET = 'USER/INIT_PASSWORD_RESET';
export const INIT_PASSWORD_RESET_REQUEST = 'USER/INIT_PASSWORD_RESET/REQUEST';
export const INIT_PASSWORD_RESET_SUCCESS = 'USER/INIT_PASSWORD_RESET/SUCCESS';
export const INIT_PASSWORD_RESET_FAILURE = 'USER/INIT_PASSWORD_RESET/FAILURE';
export const initPasswordResetRequest = createStandardAction(
  INIT_PASSWORD_RESET_REQUEST,
).map((email: string) => ({
  payload: { email },
  meta: { thunk: INIT_PASSWORD_RESET },
}));

export const initPasswordResetSuccess = createStandardAction(
  INIT_PASSWORD_RESET_SUCCESS,
).map((thunk: string) => ({
  meta: { thunk },
}));

export const initPasswordResetFailure = createStandardAction(
  INIT_PASSWORD_RESET_FAILURE,
).map((error: Error, thunk: string) => ({
  payload: error,
  error: true,
  meta: { thunk },
}));

export const CONFIRM_PASSWORD_RESET = 'USER/CONFIRM_PASSWORD_RESET';
export const CONFIRM_PASSWORD_RESET_REQUEST =
  'USER/CONFIRM_PASSWORD_RESET/REQUEST';
export const CONFIRM_PASSWORD_RESET_SUCCESS =
  'USER/CONFIRM_PASSWORD_RESET/SUCCESS';
export const CONFIRM_PASSWORD_RESET_FAILURE =
  'USER/CONFIRM_PASSWORD_RESET/FAILURE';
export const confirmPasswordResetRequest = createStandardAction(
  CONFIRM_PASSWORD_RESET_REQUEST,
).map((code: string, email: string) => ({
  payload: { code, email },
  meta: { thunk: CONFIRM_PASSWORD_RESET },
}));

export const confirmPasswordResetSuccess = createStandardAction(
  CONFIRM_PASSWORD_RESET_SUCCESS,
).map((thunk: string) => ({
  meta: { thunk },
}));

export const confirmPasswordResetFailure = createStandardAction(
  CONFIRM_PASSWORD_RESET_FAILURE,
).map((error: Error, thunk: string) => ({
  payload: error,
  error: true,
  meta: { thunk },
}));

export const UPDATE_EMAIL = 'USER/UPDATE_EMAIL';
export const UPDATE_EMAIL_REQUEST = 'USER/UPDATE_EMAIL/REQUEST';
export const UPDATE_EMAIL_SUCCESS = 'USER/UPDATE_EMAIL/SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'USER/UPDATE_EMAIL/FAILURE';
export const updateEmailRequest = createStandardAction(
  UPDATE_EMAIL_REQUEST,
).map((password: string, email: string) => ({
  payload: { email, password },
  meta: { thunk: UPDATE_EMAIL },
}));

export const updateEmailSuccess = createStandardAction(
  UPDATE_EMAIL_SUCCESS,
).map((thunk: string) => ({
  meta: { thunk },
}));

export const updateEmailFailure = createStandardAction(
  UPDATE_EMAIL_FAILURE,
).map((error: Error, thunk: string) => ({
  payload: error,
  error: true,
  meta: { thunk },
}));

export const UPDATE_PASSWORD = 'USER/UPDATE_PASSWORD';
export const UPDATE_PASSWORD_REQUEST = 'USER/UPDATE_PASSWORD/REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'USER/UPDATE_PASSWORD/SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'USER/UPDATE_PASSWORD/FAILURE';
export const updatePasswordRequest = createStandardAction(
  UPDATE_PASSWORD_REQUEST,
).map((oldPassword: string, newPassword: string) => ({
  payload: { oldPassword, newPassword },
  meta: { thunk: UPDATE_PASSWORD },
}));

export const updatePasswordSuccess = createStandardAction(
  UPDATE_PASSWORD_SUCCESS,
).map((thunk: string) => ({
  meta: { thunk },
}));

export const updatePasswordFailure = createStandardAction(
  UPDATE_PASSWORD_FAILURE,
).map((error: Error, thunk: string) => ({
  payload: error,
  error: true,
  meta: { thunk },
}));

export const UPDATE_USER_DATA = 'USER/UPDATE_USER_DATA';
export const UPDATE_USER_DATA_REQUEST = 'USER/UPDATE_USER_DATA/REQUEST';
export const UPDATE_USER_DATA_SUCCESS = 'USER/UPDATE_USER_DATA/SUCCESS';
export const UPDATE_USER_DATA_FAILURE = 'USER/UPDATE_USER_DATA/FAILURE';
export const updateUserDataRequest = createStandardAction(
  UPDATE_USER_DATA_REQUEST,
).map((userData: UserData) => ({
  payload: { userData },
  meta: { thunk: UPDATE_USER_DATA },
}));

export const updateUserDataSuccess = createStandardAction(
  UPDATE_USER_DATA_SUCCESS,
).map((thunk: string) => ({
  meta: { thunk },
}));

export const updateUserDataFailure = createStandardAction(
  UPDATE_USER_DATA_FAILURE,
).map((error: Error, thunk: string) => ({
  payload: error,
  error: true,
  meta: { thunk },
}));

export const LOGOUT = 'USER/LOGOUT';
export const LOGOUT_REQUEST = 'USER/LOGOUT/REQUEST';
export const LOGOUT_SUCCESS = 'USER/LOGOUT/SUCCESS';
export const LOGOUT_FAILURE = 'USER/LOGOUT/FAILURE';
export const logOutRequest = createStandardAction(LOGOUT_REQUEST).map(() => ({
  meta: { thunk: LOGOUT },
}));

export const logOutSuccess = createStandardAction(LOGOUT_SUCCESS).map(
  (thunk: string) => ({
    meta: { thunk },
  }),
);

export const logOutFailure = createStandardAction(LOGOUT_FAILURE).map(
  (error: Error, thunk: string) => ({
    payload: error,
    error: true,
    meta: { thunk },
  }),
);
