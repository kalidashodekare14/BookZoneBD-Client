import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAdminVerify } from '../Redux/slice/adminSlice';
import useAuth from './useAuth';

const useAdmin = () => {
    const { admin, loading, error } = useSelector((state) => state.isAdmin);
    const dispatch = useDispatch();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        dispatch(isAdminVerify({ email: user?.email }))
    }, [user])

    return [admin];
};

export default useAdmin;