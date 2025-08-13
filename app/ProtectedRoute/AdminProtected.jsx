import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router';
import { OrbitProgress } from 'react-loading-indicators';
import useAdmin from '../hooks/useAdmin';

const AdminProtected = () => {
    const { user, loading, logoutSystem } = useAuth();
    const location = useLocation();
    const [admin, adminLoading] = useAdmin();



    if ((loading || adminLoading)) {
        return <div className='h-[550px] flex flex-col justify-center items-center'>
            <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
            <p className='text-xl'>Please wait...</p>
        </div>
    }


    if (!user) {
        return <Navigate to={"/login"} replace state={{ from: location }} />
    }

    if (!admin) {
        logoutSystem()
        return <Navigate to={"/login"} replace state={{ from: location }} />
    }

    return <Outlet />
};

export default AdminProtected;