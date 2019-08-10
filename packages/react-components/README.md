# `components`

Functional React components library made with `styled-components` and presented with `storybook`

## Usage

Import the component library and the `ThemeProvider`

```
import { Button, GlobalStyle, Theme } from '@shipfirst/react-components'
import { ThemeProvider } from 'styled-components'
```

Include `GlobalStyle` and pass the `Theme` to the `ThemeProvider`.
Include any component from the package `@shipfirst/react-components`, like `Button`

```
<App>
  <GlobalStyle />
  <ThemeProvider theme={Theme}>
    <>
      <Button>Button</Button>
    </>
  </ThemeProvider>
</App>
```

## Theming

We suggest ot create a new package to replace or extend the default theme provided by the base React component library `@shipfirst/react-components`

In order to create a new theme, create a new package that exports

```
export { Theme, GlobalStyle } from './theme/exampleTheme'
```

and overrides the default theme

```
import { ThemeType } from '@shipfirst/react-components'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: serif;
  }
`

const colors = {
  primary: '#F79A3E',
  secondary: '#EB4962',
}

export const Theme: ThemeType = {
  borderRadius: '5px',

  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
  },

  buttons: {
    variants: {
      primary: {
        backgroundColor: colors.primary,
        borderRadius: '2px',
        color: 'white',
      },
    },
  },
}
```
