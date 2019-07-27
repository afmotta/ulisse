import getOr from 'lodash/fp/getOr';
import { createSelector } from 'reselect';
import { KEY } from './reducer';
import { AuthState } from './types';

interface RootState {
  [KEY]: AuthState;
}

const getState = (state: RootState): AuthState => state[KEY];

export const getIsAuthenticated = createSelector(
  getState,
  getOr(false, 'isAuthenticated'),
);

export const getAuthData = createSelector(
  getState,
  state => state.authData,
);
export const getIsAnonymous = createSelector(
  getAuthData,
  getOr(false, 'isAnonymous'),
);

export const getUid = createSelector(
  getAuthData,
  getOr('', 'uid'),
);

export const getEmail = createSelector(
  getAuthData,
  getOr('', 'email'),
);

export const getEmailVerified = createSelector(
  getAuthData,
  getOr(false, 'emailVerified'),
);
