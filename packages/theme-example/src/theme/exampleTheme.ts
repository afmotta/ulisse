import { ThemeType } from '@shipfirst/react-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: serif;
  }
`;

const colors = {
  primary: '#F79A3E',
  secondary: '#EB4962',
};

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
};
