import './index.css';
import "./styles/pagination.css";
import Otp from './pages/Otp.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ReactDOM from 'react-dom/client';
import Signup from './pages/Signup.jsx';
import Cars from './pages/admin/Cars.jsx';
import React, { lazy, Suspense } from 'react';
import UserWallet from './pages/UserWallet.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AvailableCars from './pages/AvailableCars.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import CarDetailedPage from './pages/CarDetailedPage.jsx';
import { SocketContextProvider } from "./contexts/SocketContext.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NotificationContextProvider } from './contexts/NotificationContext';
import { NotificationSocketContextProvider } from './contexts/NotificationSocketContext';
import SuspenseLoader from './components/SuspenseLoader';

// Lazy loads
// users
const Profile = lazy(() => import('./pages/Profile.jsx'));
const UserBookings = lazy(() => import("./pages/UserBookings.jsx"));
const UserBookingDetailed = lazy(() => import("./pages/UserBookingDetailed.jsx"));

// admin
const Hosts = lazy(() => import('./pages/admin/Hosts.jsx'));
const Brands = lazy(() => import('./pages/admin/Brands.jsx'));
const BodyTypes = lazy(() => import('./pages/admin/BodyTypes.jsx'));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AdminWallet = lazy(() => import('./pages/admin/AdminWallet.jsx'));
const VerifyUsers = lazy(() => import('./pages/admin/VerifyUsers.jsx'));
const HostRequests = lazy(() => import('./pages/admin/HostRequests.jsx'));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings.jsx"));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const AdminCarDetailed = lazy(() => import('./pages/admin/AdminCarDetailed.jsx'));
const AdminHostChatPage = lazy(() => import("./pages/admin/AdminHostChatPage.jsx"));
const AdminBookingHistory = lazy(() => import('./pages/admin/AdminBookingHistory.jsx'));
const HostRequestDetailed = lazy(() => import('./pages/admin/HostRequestDetailed.jsx'));
const AdminBookingDetailed = lazy(() => import("./pages/admin/AdminBookingDetailed.jsx"));
const LicenseRequestDetailed = lazy(() => import('./pages/admin/LicenseRequestDetailed.jsx'));

// host
const HostLogin = lazy(() => import("./pages/host/HostLogin.jsx"));
const HostWallet = lazy(() => import("./pages/host/HostWallet.jsx"));
const BecomeHost = lazy(() => import("./pages/host/BecomeHost.jsx"));
const MyVehicles = lazy(() => import("./pages/host/MyVehicles.jsx"));
const HostProfile = lazy(() => import("./pages/host/HostProfile.jsx"));
const HostBookings = lazy(() => import("./pages/host/HostBookings.jsx"));
const ChatWithAdmin = lazy(() => import("./pages/host/ChatWithAdmin.jsx"));
const HostDashboard = lazy(() => import("./pages/host/HostDashboard.jsx"));
const HostCarDetailed = lazy(() => import("./pages/host/HostCarDetailedPage.jsx"));
const HostBookingHistory = lazy(()=> import("./pages/host/HostBookingHistory.jsx"));
const HostBookingDetailed = lazy(() => import("./pages/host/HostBookingDetailed.jsx"));

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
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><Cars /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/brands",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><Brands /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/body-types",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><BodyTypes /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/host-requests",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><HostRequests /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/verify-users",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><VerifyUsers /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/host-requests/:registrationNumber",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><HostRequestDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/cars/:registrationNumber",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><AdminCarDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/license-verify-requests/:licenseNumber",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><LicenseRequestDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/become-host",
    element: <Suspense fallback={<SuspenseLoader/>}><BecomeHost /></Suspense>
  },
  {
    path: "/host-login",
    element: <Suspense fallback={<SuspenseLoader/>}><HostLogin /></Suspense>
  },
  {
    path: "/host",
    element: <PrivateRoute role="host"><Suspense fallback={<SuspenseLoader/>}><HostDashboard /></Suspense></PrivateRoute>
  },
  {
    path: "/host/my-vehicles",
    element: <PrivateRoute role="host"><Suspense fallback={<SuspenseLoader/>}><MyVehicles /></Suspense></PrivateRoute>
  },
  {
    path: "/host/cars/:registrationNumber",
    element: <PrivateRoute role="host"><Suspense fallback={<SuspenseLoader/>}><HostCarDetailed /></Suspense></PrivateRoute>
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
    element: <PrivateRoute role="host"><Suspense fallback={<SuspenseLoader/>}><HostWallet /></Suspense></PrivateRoute>
  },
  {
    path: "/wallet",
    element: <PrivateRoute role="user"><UserWallet /></PrivateRoute>
  },
  {
    path: "/my-bookings",
    element: <PrivateRoute role="user"><Suspense fallback={<SuspenseLoader/>}><UserBookings /></Suspense></PrivateRoute>
  },
  {
    path: "/booking-details/:paymentId",
    element: <PrivateRoute role="user"><Suspense fallback={<SuspenseLoader/>}><UserBookingDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/host/profile",
    element: <PrivateRoute role="host"><Suspense fallback={<SuspenseLoader/>}><HostProfile /></Suspense></PrivateRoute>
  },
  {
    path: "/host/bookings",
    element: <PrivateRoute role="host"><Suspense fallback={<SuspenseLoader/>}><HostBookings /></Suspense></PrivateRoute>
  },
  {
    path: "/host/booking-history",
    element: <PrivateRoute role="host"><Suspense fallback={<SuspenseLoader/>}><HostBookingHistory /></Suspense></PrivateRoute>
  },
  {
    path: "/host/booking-details/:paymentId",
    element: <PrivateRoute role="host"><Suspense fallback={<SuspenseLoader/>}><HostBookingDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/hosts",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><Hosts /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/chat/:email",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><SocketContextProvider><AdminHostChatPage /></SocketContextProvider></Suspense></PrivateRoute>
  },
  {
    path: "/host/chat",
    element: <PrivateRoute role="host"><Suspense fallback={<SuspenseLoader/>}><SocketContextProvider><ChatWithAdmin /></SocketContextProvider></Suspense></PrivateRoute>
  },
  {
    path: "/admin/wallet",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><AdminWallet /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/bookings",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><AdminBookings /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/booking-details/:paymentId",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><AdminBookingDetailed /></Suspense></PrivateRoute>
  },
  {
    path: "/admin/booking-history",
    element: <PrivateRoute role="admin"><Suspense fallback={<SuspenseLoader/>}><AdminBookingHistory/></Suspense></PrivateRoute>
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationSocketContextProvider>
        <NotificationContextProvider>
          <RouterProvider router={route} />
        </NotificationContextProvider>
      </NotificationSocketContextProvider>
    </AuthProvider>
  </React.StrictMode>,
);

