import pick from 'lodash/fp/pick';
import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AuthState, AuthData } from './types';

export const KEY = 'auth';

export const initialState: AuthState = {
  isAuthenticated: false,
  authData: {
    isAnonymous: false,
    uid: '',
    email: '',
    emailVerified: false,
  },
};

const pickAuthData: <T extends AuthData>(payload: T) => AuthData = pick([
  'isAnonymous',
  'uid',
  'email',
  'emailVerified',
]);

const reducer = createReducer<AuthState, ActionType<typeof actions>>(
  initialState,
)
  .handleAction(actions.updateAuthSuccess, (state, action) => ({
    ...state,
    authData: pickAuthData(action.payload),
    isAuthenticated: true,
  }))
  .handleAction(actions.updateAuthFailure, state => ({
    ...state,
    ...initialState,
  }));

export default reducer;
