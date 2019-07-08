import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type CounterState = Readonly<{
  counter: number;
}>;

export const initialState: CounterState = {
  counter: 0,
};

const reducer = createReducer<CounterState, ActionType<typeof actions>>(
  initialState,
)
  .handleAction(actions.increment, state => ({
    ...state,
    counter: state.counter + 1,
  }))
  .handleAction(actions.decrement, state => ({
    ...state,
    counter: state.counter - 1,
  }))
  .handleAction(actions.setCounter, (state, action) => ({
    ...state,
    counter: action.payload,
  }));

export default reducer;
