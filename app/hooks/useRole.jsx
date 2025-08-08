import React, { useEffect, useState } from 'react';
import axiosSecure from '../utils/axiosSecure';
import useAuth from './useAuth';

const useRole = () => {
    const { user } = useAuth()
    const [isRole, setIsRole] = useState("");

    useEffect(() => {
        const userRoleFetched = async () => {
            const res = await axiosSecure.get('/api/userInfo/user_role');
            setIsRole(res.data.role)
        }
        if (user?.email) {
            userRoleFetched();
        }
    }, [user?.email])

    return { isRole }
};

export default useRole;