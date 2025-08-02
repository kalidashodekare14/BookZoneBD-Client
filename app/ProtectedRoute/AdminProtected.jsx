import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router';
import { OrbitProgress } from 'react-loading-indicators';
import useAdmin from '../hooks/useAdmin';

const AdminProtected = () => {
    const { user, loading, logoutSystem } = useAuth();
    const location = useLocation();
    const [wait, setWait] = useState(true);
    const [admin, adminLoading, authLoading] = useAdmin();

    useEffect(() => {
        const timer = setTimeout(() => {
            setWait(false);
        }, 1000)
        return () => clearTimeout(timer);
    }, [])


    if (wait || loading || !user === undefined) {
        return <div className='h-[550px] flex flex-col justify-center items-center'>
            <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
            <p className='text-xl'>Please wait...</p>
        </div>
    }

    if (user && admin !== true) {
        logoutSystem()
        return <Navigate to={"/login"} replace state={{ from: location }} />
    }

    return user && admin === true ? <Outlet /> : <Navigate to={"/login"} replace state={{ from: location }} />
};

export default AdminProtected;