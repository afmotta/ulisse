import { ConnectedApp } from '@shipfirst/core'
import { Counter } from '@shipfirst/counter-example-module'
import { Button, Theme } from '@shipfirst/react-components'
import { GlobalStyle } from '@shipfirst/theme-example'
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import './App.css'
import Todos from './components/todos/todos'
import store from './store/store'

class App extends Component {
  public render() {
    return (
      <ConnectedApp {...store}>
        <GlobalStyle />
        <ThemeProvider theme={Theme}>
          <>
            <Counter />
            <Todos />
            <Button>Button</Button>
          </>
        </ThemeProvider>
      </ConnectedApp>
    )
  }
}

export default App
