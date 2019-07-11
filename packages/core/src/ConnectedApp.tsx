import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export const ConnectedApp: React.FC<{
  store: Store;
  persistor: Persistor | undefined;
  children: React.ReactNode;
}> = ({ store, persistor, children }) => (
  <Provider store={store}>
    {persistor ? (
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    ) : (
      { children }
    )}
  </Provider>
);
