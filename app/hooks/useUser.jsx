import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileData } from '../Redux/slice/profileSlice';
import useAuth from './useAuth';

const useUser = () => {
    const { userData, loading, error } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const { user } = useAuth()

    useEffect(() => {
        dispatch(profileData({ email: user?.email }))
    }, [user?.email, dispatch])

    return { userData, loading, error }
};

export default useUser;