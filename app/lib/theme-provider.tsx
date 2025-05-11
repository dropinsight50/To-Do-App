// Adapted from https://github.com/pacocoursey/next-themes/blob/main/packages/next-themes/src/index.tsx
// And https://remix.run/docs/en/main/tutorials/dark-mode
import * as React from 'react'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

const themes: Array<Theme> = Object.values(Theme)

type ThemeContextType = [Theme | null, React.Dispatch<React.SetStateAction<Theme | null>>]

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

ThemeContext.displayName = 'ThemeContext'

const prefersDarkMQ = '(prefers-color-scheme: dark)'
const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT


function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: React.ReactNode
  specifiedTheme: Theme | null
}) {
  const [theme, setTheme] = React.useState<Theme | null>(() => {
    // On the server, if we don't have a specified theme then we should
    // return null and the client code will set the theme for us
    // before hydration. Then no flash happens.
    // We avoid a flash by waiting for the client to handle the theme
    // detection before rendering the UI.
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) return specifiedTheme
      else return null
    } else if (typeof window !== 'object') {
      return null
    }
    return getPreferredTheme()
  })

  const mountRun = React.useRef(false)

  React.useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true
      return
    }
    if (theme) {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ)
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? Theme.DARK : Theme.LIGHT
      setTheme(newTheme)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
}

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let Matt know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  } else {
    console.warn(
      "Hey, could you let Matt know you're seeing this message? Thanks!",
    );
  }
})();
`

function ThemeHead({ ssrTheme }: { ssrTheme: boolean }) {
  // `ssrTheme` is necessary in case you want to disable SSR themes.
  // If you don't plan on that, you can simplify this component.
  return (
    <>
      {/*
        On the server, "theme" might be `null`, so rendering the script
        prevents a flash of unstyled content.
      */}
      {/*
        If we know what the theme is from the server then we don't need
        to do fancy tricks prior to hydration to make things match.
      */}
      {ssrTheme ? null : <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />}
    </>
  )
}

function ThemeBody({ ssrTheme }: { ssrTheme: boolean }) {
  // `ssrTheme` is necessary in case you want to disable SSR themes.
  // If you don't plan on that, you can simplify this component.
  return (
    <>
      {/*
        If we know what the theme is from the server then we don't need
        to do fancy tricks on the client prior to hydration.
      */}
      {ssrTheme ? null : (
        <script
          dangerouslySetInnerHTML={{
            __html: `
const theme = localStorage.getItem("theme");
if (theme) {
  const cl = document.documentElement.classList;
  cl.remove("light", "dark");
  cl.add(theme);
}
`,
          }}
        />
      )}
    </>
  )
}

/**
 * This is a hook that returns the current theme and a function to set it.
 * This will be `null` on the first render the client makes.
 */
function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// interface ThemeProviderProps extends React.PropsWithChildren {
//   specifiedTheme?: Theme | null
// }

// function ThemeProvider({ children, specifiedTheme = null }: ThemeProviderProps) {
//   // ...
// }

export { Theme, ThemeProvider, useTheme, ThemeHead, ThemeBody }
