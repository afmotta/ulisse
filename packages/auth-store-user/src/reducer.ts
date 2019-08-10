import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { UserState } from './types';

export const KEY = 'auth';

export const initialState: UserState = {
  userData: {},
};

const reducer = createReducer<UserState, ActionType<typeof actions>>(
  initialState,
)
  .handleAction(actions.syncUserData, (state, action) => ({
    ...state,
    userData: action.payload,
  }))
  .handleAction(actions.clearUserData, state => ({
    ...state,
    ...initialState,
  }));
export default reducer;
