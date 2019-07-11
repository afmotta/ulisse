import { configureStore } from '@shipfirst/core';
import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import { ActionType, StateType } from 'typesafe-actions';
import * as todosActions from './todo/actions';
import {
  actions as counterActions,
  reducer as counterReducer,
  saga,
} from '@shipfirst/counter-example-module';
import todosReducer from './todo/reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  counter: counterReducer,
});

const rootAction = {
  counter: counterActions,
  todos: todosActions,
};

const rootSaga = function*() {
  yield fork(saga);
};

declare module '@shipfirst/core' {
  interface Types {
    RootState: StateType<typeof rootReducer>;
  }
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: ActionType<typeof rootAction>;
  }
}

// export store singleton instance
export default configureStore<
  StateType<typeof rootReducer>,
  ActionType<typeof rootAction>
>(rootReducer, rootSaga);
