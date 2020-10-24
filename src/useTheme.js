import { useState } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'

export const themes = {
  light: createMuiTheme({
    palette: {
      type: 'light'
    }
  }),
  dark: createMuiTheme({
    palette: {
      type: 'dark'
    }
  })
}

export function useTheme(initialPropsTheme) {
  const [themeName, setThemeNameRaw] = useState(initialPropsTheme)

  const setThemeName = (theme) => {
    if (typeof window !== 'undefined') document.cookie = 'theme=' + theme
    setThemeNameRaw(theme)
  }

  if (themeName !== 'light' && themeName !== 'dark') {
    setThemeName('light')
    return [themes.light, () => {}]
  }

  return [
    themes[themeName],
    () => {
      setThemeName(themeName === 'light' ? 'dark' : 'light')
    }
  ]
}
