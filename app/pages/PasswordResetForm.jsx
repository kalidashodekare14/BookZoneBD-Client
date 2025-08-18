import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import axiosPublic from '../utils/axiosPublic';
import Swal from 'sweetalert2';

const forgetPassword = () => {

    const { passwordResetSystem } = useAuth()
    const [loading, setLoading] = useState(false);
   

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log('checking email', data)
        try {
            setLoading(true)
            const res = await axiosPublic.post('/api/password_manage/password_reset_send_mail', { email: data.email });
            if (res.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have been emailed, please check.",
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
                <p className='text-2xl'>Reset Email</p>
                <div className='w-full'>
                    <p>Email:</p>
                    <input {...register("email", { required: true })} className='input focus:outline-0 w-full' type="text" placeholder='Email' />
                </div>
                <button type='submit' className='btn w-32 bg-[#003a5a] text-white'>
                    {loading ? <span class="loader"></span> : "Next"}
                </button>
            </form>
        </div>
    );
};

export default forgetPassword;