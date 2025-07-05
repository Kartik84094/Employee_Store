import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../auth';

const PrivateRoute = ({ children }) => {
    return getToken() ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
