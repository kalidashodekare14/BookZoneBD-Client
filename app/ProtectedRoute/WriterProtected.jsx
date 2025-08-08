import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { OrbitProgress } from 'react-loading-indicators';
import useRole from '../hooks/useRole';

const WriterProtected = () => {
    const { user, loading, logoutSystem } = useAuth();
    const location = useLocation();
    const [wait, setWait] = useState(true);
    const { isRole } = useRole()

    useEffect(() => {
        const timer = setTimeout(() => {
            setWait(false)
        }, 1000);
        return () => clearTimeout(timer)
    }, [])

    if (wait || user === undefined || loading) {
        return <div className='h-[550px] flex flex-col justify-center items-center'>
            <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
            <p className='text-xl'>Please wait...</p>
        </div>
    }

    if (isRole !== "Writer") {
        logoutSystem()
        return <Navigate to={'/login'} replace state={{ from: location }} />
    }

    return user && isRole === "Writer" ? <Outlet /> : <Navigate to={'/login'} replace state={{ from: location }} />

};

export default WriterProtected;