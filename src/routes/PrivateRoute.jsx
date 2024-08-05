import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.jsx';

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  console.log("privateRoute : ",user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
