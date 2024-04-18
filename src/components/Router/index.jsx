import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "../Home/index.jsx"

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <Home/>
      }
    ]
  }
])

export default function Router() {
  return (
    <RouterProvider router={router}/>
  )
}