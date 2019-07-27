import { eventChannel } from 'redux-saga';
import { call, cancelled, fork, put, take } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import fb from 'firebase';
import * as actions from './actions';
import { AuthData } from './types';

function* authStateChannel(auth: fb.auth.Auth) {
  return eventChannel(emit =>
    auth.onAuthStateChanged(
      authData => emit({ authData }),
      error => emit({ error }),
    ),
  );
}

export function* watchForAuthUpdate(firebase: fb.app.App): SagaIterator {
  const auth = firebase.auth();
  const channel = yield call(authStateChannel, auth);
  try {
    while (true) {
      try {
        const {
          authData,
          error,
        }: { authData: AuthData; error: Error } = yield take(channel);
        if (error) {
          yield put(actions.updateAuthFailure(error));
        } else if (authData) {
          yield put(actions.updateAuthSuccess(authData));
        } else {
          yield call(auth.signInAnonymously);
        }
      } catch (e) {}
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export default function*({ firebase }: { firebase: fb.app.App }): SagaIterator {
  yield fork(watchForAuthUpdate, firebase);
}
