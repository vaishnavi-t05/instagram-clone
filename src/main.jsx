import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import ViewStory from './ViewStory.jsx'
import ProtectedRoute from "./ProtectedRoute";

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
  path: "/home",
  element: (
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  )
},
  {
    path: "/story/:id/:tot",
    element: <ViewStory />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);