import { createStandardAction } from 'typesafe-actions';
import { Todo } from './types';

export const addTodo = createStandardAction('ADD_TODO')<Todo>();
export const toggleTodo = createStandardAction('TOGGLE_TODO')<number>();
export const removeTodo = createStandardAction('REMOVE_TODO')<number>();
