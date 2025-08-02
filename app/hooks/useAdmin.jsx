import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAdminVerify } from '../Redux/slice/adminSlice';
import useAuth from './useAuth';
import { OrbitProgress } from 'react-loading-indicators';

const useAdmin = () => {
    const { admin, loading: adminLoading, error } = useSelector((state) => state.isAdmin);
    const dispatch = useDispatch();
    const { user, loading: authLoading } = useAuth();

    // if (authLoading) {
    //     return <div className='h-[550px] flex flex-col justify-center items-center'>
    //         <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
    //         <p className='text-xl'>Please wait...</p>
    //     </div>
    // }

    useEffect(() => {
        if (user?.email) {
            dispatch(isAdminVerify({ email: user?.email }))
        }

    }, [user?.email, dispatch])

    return [admin, adminLoading, authLoading];
};

export default useAdmin;