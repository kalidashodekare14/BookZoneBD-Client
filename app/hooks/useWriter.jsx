import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { writerProfileFetched } from '../Redux/slice/writerProfileSlice';
import useAuth from './useAuth';

const useWriter = () => {
    const { writerData, loading, error } = useSelector(state => state.writerProfile);
    const dispatch = useDispatch();
    const { user } = useAuth()

    useEffect(() => {
        dispatch(writerProfileFetched({ email: user?.email }))
    }, [user?.email, dispatch])

    return { writerData, loading, error }
};

export default useWriter;