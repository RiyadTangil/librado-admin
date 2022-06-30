import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || {}
    if (!loginInfo?.email) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;