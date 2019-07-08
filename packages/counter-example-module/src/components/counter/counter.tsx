import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../store/actions';
import { getCounter } from '../../store/selectors';

const Counter: React.FC<{}> = () => {
  const counter = useSelector(getCounter);
  const dispatch = useDispatch();
  const onDecrement = () => dispatch(decrement());
  const onIncrement = () => dispatch(increment());
  return (
    <div>
      <button onClick={onDecrement}>-</button>
      <div>{counter}</div>
      <button onClick={onIncrement}>+</button>
    </div>
  );
};

export default Counter;
