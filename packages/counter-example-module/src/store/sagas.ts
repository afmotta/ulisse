import { fork, put, delay, select } from 'redux-saga/effects';
import { setCounter } from './actions';
import { getCounter } from './selectors';

function* incrementCounter() {
  while (true) {
    yield delay(10000);
    const counter: number = yield select(getCounter);
    yield put(setCounter(counter + 10))
  }
}

export default function*() {
    yield fork(incrementCounter)
}