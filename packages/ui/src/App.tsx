import React, { Component } from 'react';
import { Counter } from '@shipfirst/counter-example-module';
import Todos from './components/todos/todos';

import './App.css';
import store from './store/store';
import { ConnectedApp } from '@shipfirst/store';

class App extends Component {
  public render() {
    return (
      <ConnectedApp {...store}>
        <Counter />
        <Todos />
      </ConnectedApp>
    );
  }
}

export default App;
