import './index.css';
import Otp from './pages/Otp.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ReactDOM from 'react-dom/client';
import Signup from './pages/Signup.jsx';
import Cars from './pages/admin/Cars.jsx';
import React, { lazy, Suspense } from 'react';
import Brands from './pages/admin/Brands.jsx';
import HostLogin from './pages/host/HostLogin.jsx';
import BodyTypes from './pages/admin/BodyTypes.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import MyVehicles from './pages/host/MyVehicles.jsx';
import AvailableCars from './pages/AvailableCars.jsx';
import VerifyUsers from './pages/admin/VerifyUsers.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import HostRequests from './pages/admin/HostRequests.jsx';
import CarDetailedPage from './pages/CarDetailedPage.jsx';
import HostDashboard from './pages/host/HostDashboard.jsx';
import AdminCarDetailed from './pages/admin/AdminCarDetailed.jsx';
import HostCarDetailed from './pages/host/HostCarDetailedPage.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HostRequestDetailed from './pages/admin/HostRequestDetailed.jsx';
import LicenseRequestDetailed from './pages/admin/LicenseRequestDetailed.jsx';

// Lazy loads
const Profile = lazy(() => import('./pages/Profile.jsx'));
const BecomeHost = lazy(() => import("./pages/host/BecomeHost.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));

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
  { path: "/profile", element: <PrivateRoute role="user"><Suspense fallback={<div>Loading...</div>}><Profile /></Suspense></PrivateRoute> },
  { path: "/admin", element: <PrivateRoute role="admin"><Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense></PrivateRoute> },
  {
    path: "/admin-login",
    element: <Suspense fallback={<div>Loading...</div>}><AdminLogin /></Suspense>
  },
  {
    path: "/admin/cars",
    element: <PrivateRoute role="admin"><Cars /></PrivateRoute>
  },
  {
    path: "/admin/brands",
    element: <PrivateRoute role="admin"><Brands /></PrivateRoute>
  },
  {
    path: "/admin/body-types",
    element: <PrivateRoute role="admin"><BodyTypes /></PrivateRoute>
  },
  {
    path: "/admin/host-requests",
    element: <PrivateRoute role="admin"><HostRequests /></PrivateRoute>
  },
  {
    path: "/admin/verify-users",
    element: <PrivateRoute role="admin"><VerifyUsers /></PrivateRoute>
  },
  {
    path: "/admin/host-requests/:registrationNumber",
    element: <PrivateRoute role="admin"><HostRequestDetailed /></PrivateRoute>
  },
  {
    path: "/admin/cars/:registrationNumber",
    element: <PrivateRoute role="admin"><AdminCarDetailed /></PrivateRoute>
  },
  {
    path: "/admin/license-verify-requests/:licenseNumber",
    element: <PrivateRoute role="admin"><LicenseRequestDetailed /></PrivateRoute>
  },
  {
    path: "/become-host",
    element: <Suspense fallback={"Lazy Loading..."}><BecomeHost /></Suspense>
  },
  {
    path: "/host-login",
    element: <HostLogin />
  },
  {
    path: "/host",
    element: <PrivateRoute role="host"><HostDashboard /></PrivateRoute>
  },
  {
    path: "/host/my-vehicles",
    element: <PrivateRoute role="host"><MyVehicles /></PrivateRoute>
  },
  {
    path: "/host/cars/:registrationNumber",
    element: <PrivateRoute role="host"><HostCarDetailed /></PrivateRoute>
  },
  {
    path: "/search",
    element: <AvailableCars />
  },
  {
    path: "/car-details",
    element: <CarDetailedPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </React.StrictMode>,
);

