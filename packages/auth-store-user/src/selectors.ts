import { createSelector } from 'reselect';
import { KEY } from './reducer';
import { UserState } from './types';

interface RootState {
  [KEY]: UserState;
}

const getState = (state: RootState): UserState => state[KEY];

export const getUserData = createSelector(
  getState,
  ({ userData }) => userData,
);
