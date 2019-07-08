import { prop } from 'ramda';
import { createSelector } from 'reselect';
import { RootState } from '@shipfirst/store';
import { TodoState } from './types';

const getState = (state: RootState): TodoState => state.todos;

export const getTodoList = createSelector(
  getState,
  prop('todos'),
);
