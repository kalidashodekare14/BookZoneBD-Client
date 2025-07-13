import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router';

const AuthProtected = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (user === undefined) {
        return null;
    }

    return user ? <Outlet /> : <Navigate to={'/login'} replace state={{ from: location }} />;
};

export default AuthProtected;