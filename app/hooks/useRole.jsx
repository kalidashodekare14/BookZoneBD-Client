import React, { useEffect, useState } from 'react';
import axiosSecure from '../utils/axiosSecure';
import useAuth from './useAuth';

const useRole = () => {
    const { user } = useAuth()
    const [isRole, setIsRole] = useState("");
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        const userRoleFetched = async () => {
            try {
                setRoleLoading(true)
                const res = await axiosSecure.get('/api/userInfo/user_role');
                return setIsRole(res.data.role)
            } catch (error) {
                console.log(error.message)
                setRoleLoading(false)
            } finally {
                setRoleLoading(false)
            }
        }
        if (user?.email) {
            userRoleFetched();
        }
    }, [user?.email])

    return { isRole, roleLoading }
};

export default useRole;