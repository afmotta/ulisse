import { createSelector } from 'reselect';
import { RootState } from '@shipfirst/core';
import { CounterState } from './reducer';

const getState = (state: RootState): CounterState => state.counter;

export const getCounter = createSelector(
  getState,
  counterSlice => counterSlice.counter,
);
