export type ThemeType = {
  borderRadius: string
  colors: {
    primary: string
    secondary: string
  }

  buttons: {
    variants: {
      primary: {
        backgroundColor: string
        borderRadius: string
        color: string
      }
    }
  }
}
