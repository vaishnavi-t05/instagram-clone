import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewStory from './ViewStory.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/home',
    element: <App />
  },
  {
    path: '/story/:id/:tot',
    element: <ViewStory />
  },
  
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)