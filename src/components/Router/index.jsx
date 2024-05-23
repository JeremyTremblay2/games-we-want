import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, CssBaseline, styled, ThemeProvider, useMediaQuery } from "@mui/material"
import { useMemo } from "react"
import Home from "../Home/index.jsx"
import GameDetails from "../GameDetails/index.jsx"
import Login from "../Login/index.jsx"
import Layout from "../Layout/index.jsx"
import NotificationsProvider from "../Notifications/index.jsx"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/game/:gameId",
        element: <GameDetails/>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Login isRegister />
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
        },
        shape: {
          borderRadius: 15,
        },
      }),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationsProvider prefersDarkMode={prefersDarkMode} />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}