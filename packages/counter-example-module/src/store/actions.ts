import { createStandardAction } from 'typesafe-actions';

export const increment = createStandardAction('INCREMENT_COUNTER')<undefined>();
export const decrement = createStandardAction('DECREMENT_COUNTER')<undefined>();
export const setCounter = createStandardAction('SET_COUNTER')<number>();
