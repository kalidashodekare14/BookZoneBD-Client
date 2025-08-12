import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosPublic from '../utils/axiosPublic';
import { useLocation } from 'react-router';
import Swal from 'sweetalert2';

const ResetPassword = () => {

    const [loading, setLoading] = useState(false);
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log('checking email', data)
        try {
            const resetData = {
                token: token,
                password: data.password
            }
            setLoading(true)
            const res = await axiosPublic.post('/api/password_manage/reset_password', resetData);
            if (res.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your password has been changed.",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='h-[600px] flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-96 h-52 border border-[#bbb] p-5 flex flex-col items-center gap-3'>
                <p className='text-2xl'>Reset Password</p>
                <div className='w-full'>
                    <p>Password:</p>
                    <input {...register("password", { required: true })} className='input focus:outline-0 w-full' type="text" placeholder='Enter your new password' />
                </div>
                <button type='submit' className='btn w-32 bg-[#003a5a] text-white'>
                    {loading ? <span class="loader"></span> : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;