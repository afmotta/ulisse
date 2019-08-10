// import { GlobalStyle, Theme } from '@shipfirst/react-components'
import { GlobalStyle, Theme } from '@shipfirst/theme-example'
import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator, configure } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

const themeDecorator = (storyFn: any) => (
  <ThemeProvider theme={Theme}>
    <>
      <GlobalStyle />
      {storyFn()}
    </>
  </ThemeProvider>
)

const req = require.context('../packages', true, /.stories.tsx?$/)
function loadStories() {
  addDecorator(withKnobs)
  addDecorator(themeDecorator)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
