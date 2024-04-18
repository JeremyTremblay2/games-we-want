import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { useMemo } from "react"
import Home from "../Home/index.jsx"

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])

export default function Router() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider >
  )
}