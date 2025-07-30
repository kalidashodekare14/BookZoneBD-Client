import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

const forgetPassword = () => {

    const { passwordResetSystem } = useAuth()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            console.log(data)
            await passwordResetSystem(data.email);  
            alert('Password reset email send!')
        } catch (error) {
            console.log(error)
            alert('Failed to send reset email.')
        }
    }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-96 h-52 border border-[#bbb] p-5 flex flex-col items-center gap-3'>
                <p className='text-2xl'>Reset Password</p>
                <div className='w-full'>
                    <p>Email:</p>
                    <input {...register("email", { required: true })} className='input focus:outline-0 w-full' type="text" placeholder='Email' />
                </div>
                <button type='submit' className='btn w-32 bg-[#003a5a] text-white'>Next</button>
            </form>
        </div>
    );
};

export default forgetPassword;