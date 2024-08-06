import './index.css';
import Otp from './pages/Otp.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ReactDOM from 'react-dom/client';
import Signup from './pages/Signup.jsx';
import Cars from './pages/admin/Cars.jsx';
import React, { lazy, Suspense } from 'react';
import UserWallet from './pages/UserWallet.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AvailableCars from './pages/AvailableCars.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import CarDetailedPage from './pages/CarDetailedPage.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Lazy loads
// users
const Profile = lazy(() => import('./pages/Profile.jsx'));

// admin
const Brands = lazy(() => import('./pages/admin/Brands.jsx'));
const BodyTypes = lazy(() => import('./pages/admin/BodyTypes.jsx'));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const VerifyUsers = lazy(() => import('./pages/admin/VerifyUsers.jsx'));
const HostRequests = lazy(() => import('./pages/admin/HostRequests.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const AdminCarDetailed = lazy(() => import('./pages/admin/AdminCarDetailed.jsx'));
const HostRequestDetailed = lazy(() => import('./pages/admin/HostRequestDetailed.jsx'));
const LicenseRequestDetailed = lazy(() => import('./pages/admin/LicenseRequestDetailed.jsx'));

// host
const HostLogin = lazy(() => import("./pages/host/HostLogin.jsx"));
const HostWallet = lazy(() => import("./pages/host/HostWallet.jsx"));
const BecomeHost = lazy(() => import("./pages/host/BecomeHost.jsx"));
const MyVehicles = lazy(() => import("./pages/host/MyVehicles.jsx"));
const HostDashboard = lazy(() => import("./pages/host/HostDashboard.jsx"));
const HostCarDetailed = lazy(() => import("./pages/host/HostCarDetailedPage.jsx"));

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
    element: <PrivateRoute role="admin"><Suspense fallback={"Lazy Loading..."}><Cars /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/brands",
    element: <PrivateRoute role="admin"><Suspense fallback={"Lazy Loading..."}><Brands /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/body-types",
    element: <PrivateRoute role="admin"><Suspense fallback={"Lazy Loading..."}><BodyTypes /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/host-requests",
    element: <PrivateRoute role="admin"><Suspense fallback={"Lazy Loading..."}><HostRequests /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/verify-users",
    element: <PrivateRoute role="admin"><Suspense fallback={"Lazy Loading..."}><VerifyUsers /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/host-requests/:registrationNumber",
    element: <PrivateRoute role="admin"><Suspense fallback={"Lazy Loading..."}><HostRequestDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/cars/:registrationNumber",
    element: <PrivateRoute role="admin"><Suspense fallback={"Lazy Loading..."}><AdminCarDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/license-verify-requests/:licenseNumber",
    element: <PrivateRoute role="admin"><Suspense fallback={"Lazy Loading..."}><LicenseRequestDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/become-host",
    element: <Suspense fallback={"Lazy Loading..."}><BecomeHost /></Suspense>
  },
  {
    path: "/host-login",
    element:<Suspense fallback={"Lazy Loading..."}><HostLogin /></Suspense>
  },
  {
    path: "/host",
    element: <PrivateRoute role="host"><Suspense fallback={"Lazy Loading..."}><HostDashboard /></Suspense></PrivateRoute>
  },
  {
    path: "/host/my-vehicles",
    element: <PrivateRoute role="host"><Suspense fallback={"Lazy Loading..."}><MyVehicles /></Suspense></PrivateRoute>
  },
  {
    path: "/host/cars/:registrationNumber",
    element: <PrivateRoute role="host"><Suspense fallback={"Lazy Loading..."}><HostCarDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/search",
    element: <AvailableCars />
  },
  {
    path: "/car-details/:registrationNumber",
    element: <CarDetailedPage />
  },
  {
    path: "/host/wallet",
    element: <PrivateRoute role="host"><Suspense fallback={"Lazy Loading..."}><HostWallet /></Suspense></PrivateRoute>
  },
  {
    path: "/wallet",
    element: <PrivateRoute role="user"><UserWallet /></PrivateRoute>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </React.StrictMode>,
);

