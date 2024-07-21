import './index.css';
import Otp from './pages/Otp.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ReactDOM from 'react-dom/client';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import Cars from './pages/admin/Cars.jsx';
import React, { lazy, Suspense } from 'react';
import Brands from './pages/admin/Brands.jsx';
import BodyTypes from './pages/admin/BodyTypes.jsx';
// import BecomeHost from './pages/host/BecomeHost.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Lazy loads
const BecomeHost = lazy(() => import("./pages/host/BecomeHost.jsx"));

// Include credentials (cookies) in requests
// axios.defaults.withCredentials = true;

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/otp",
    element: <Otp />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />
  },
  {
    path: "/admin/cars",
    element: <Cars />
  },
  {
    path: "/admin/brands",
    element: <Brands />
  },
  {
    path: "/admin/body-types",
    element: <BodyTypes />
  },
  {
    path: "/become-host",
    element: <Suspense fallback={"Lazy Loading..."}><BecomeHost /></Suspense>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
)
