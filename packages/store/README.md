# @shipfirst/store

> Redux store configuration with opinionated defaults

## Description

Utility for creating a redux store, with the following libraries:

- redux-saga
- redux-saga-thunk
- redux-logger
- redux-devtools-extension
- redux-persist

The configurator comes with an opinionated default configuration, that can be customized padding a configurator object.

## Usage

Using defaults:

```javascript
import { ActionType, StateType } from 'typesafe-actions';

const rootReducer = ...
const rootAction = ...

const { store, persistor } = configureStore<
  StateType<typeof rootReducer>,
  ActionType<typeof rootAction>
>({
  reducer: rootReducer,
  saga: rootSaga,
});
```

```javascript
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedApp } from '@shipfirst/store';

<ConnectedApp {...store}>
  <Counter />
  <Todos />
</ConnectedApp>;
```

using custom configuration:

```sh
configureStore<
  StateType<typeof rootReducer>,
  ActionType<typeof rootAction>
>({
  reducer: rootReducer,
  saga: rootSaga,
  devTools: {...},
  log: {...},
  persist: {...},
  enhancers: [...],
  middlewares: [...],
});
```
