import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './themeTypes';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: serif;
  }
`;

const colors = {
  primary: '#37B8AF',
  secondary: '#F79A3E',
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
        borderRadius: '5px',
        color: 'white',
      },
    },
  },
};
