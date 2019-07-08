import { TodoState } from './types';
import { createReducer } from 'typesafe-actions';
import { addTodo, removeTodo, toggleTodo } from './actions';

export const initialState: TodoState = {
  todos: [],
};

const reducer = createReducer(initialState)
  .handleAction(addTodo, (state, action) => ({
    todos: [...state.todos, action.payload],
  }))
  .handleAction(removeTodo, (state, action) => ({
    todos: state.todos.filter(todo => todo.id !== action.payload),
  }))
  .handleAction(toggleTodo, (state, action) => ({
    todos: [
      ...state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
      ),
    ],
  }));

export default reducer;
