import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodoList } from '../../store/todo/selectors';
import { addTodo, removeTodo, toggleTodo } from '../../store/todo/actions';

const Todos: React.FC<{}> = () => {
  const [text, setText] = useState('');
  const todos = useSelector(getTodoList);
  const dispatch = useDispatch();
  const dispatchAddTodo = () =>
    dispatch(addTodo({ id: new Date().getTime(), done: false, text }));
  const dispatchRemoveTodo = (id: number) => dispatch(removeTodo(id));
  const dispatchToggleTodo = (id: number) => dispatch(toggleTodo(id));
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li>
            <span
              style={{ textDecoration: todo.done ? 'line-through' : 'initial' }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatchRemoveTodo(todo.id)}>remove</button>
            <button onClick={() => dispatchToggleTodo(todo.id)}>toggle</button>
          </li>
        ))}
      </ul>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={dispatchAddTodo}>add</button>
    </div>
  );
};

export default Todos;
