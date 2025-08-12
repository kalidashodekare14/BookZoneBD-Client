import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAdminVerify } from '../Redux/slice/adminSlice';
import useAuth from './useAuth';
import { OrbitProgress } from 'react-loading-indicators';

const useAdmin = () => {
    const { admin, loading: adminLoading, error } = useSelector((state) => state.isAdmin);
    const dispatch = useDispatch();
    const { user, loading: authLoading } = useAuth();


    useEffect(() => {
        if (user?.email) {
            dispatch(isAdminVerify({ email: user?.email }))
        }

    }, [user?.email, dispatch])

    return [admin, adminLoading, authLoading];
};

export default useAdmin;