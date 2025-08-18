import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAdminVerify } from '../Redux/slice/adminSlice';
import useAuth from './useAuth';
import { OrbitProgress } from 'react-loading-indicators';
import axiosSecure from '../utils/axiosSecure';

const useAdmin = () => {
    // const { admin, loading: adminLoading, error } = useSelector((state) => state.isAdmin);
    // const dispatch = useDispatch();
    const { user, loading: authLoading } = useAuth();
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true)


    useEffect(() => {
        const adminFetched = async () => {
            try {
                setAdminLoading(true)
                const res = await axiosSecure.get(`/api/user_verify/isAdmin/${user.email}`)
                setAdmin(res.data.admin)
            } catch (error) {
                console.error(error.message)
                setAdminLoading(false)
            } finally {
                setAdminLoading(false)
            }
        }
        if (user?.email) {
            adminFetched()
        }
    }, [user?.email])

    // This is reduxt call
    // useEffect(() => {
    //     if (user?.email) {
    //         dispatch(isAdminVerify({ email: user.email }))
    //     }

    // }, [user?.email])


    return [admin, adminLoading];
};

export default useAdmin;