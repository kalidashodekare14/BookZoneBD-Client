import React from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import axiosSecure from '../utils/axiosSecure';

const SignUp = () => {

    const { registerSystem, googleAuthSystem, setLoading, loading } = useAuth()
    const navigation = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        registerSystem(data.email, data.password)
            .then(async (res) => {
                console.log(res.user)
                const userInfo = {
                    email: data.email,
                    password: data.password
                }
                const response = await axiosSecure.post('/api/user/register', userInfo);
                if (res.data.success === true) {
                    navigation('/')
                }
            })
            .catch(error => {
                console.log(error.message)
                setLoading(false)
            })
    }

    const handleGoogleRegister = () => {
        googleAuthSystem()
            .then(res => {
                console.log(res.user)
                navigation('/')
            })
            .catch(error => {
                console.log(error.message)
                setLoading(false)
            })
    }


    return (
        <div className=' flex justify-center items-center font-mixed lg:h-[600px] py-5 bg-[#F0F2F5]'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-8 lg:w-[30%] w-[95%]'>
                <div className='text-center space-y-2 my-5'>
                    <h1 className='text-2xl font-semibold'>Signup to your account</h1>
                    <p className='text-[#5a5a5a] space-x-2'>
                        <span> Already have an account?</span>
                        <Link to={"/login"}>
                            <span className='text-[#3BB77E] cursor-pointer text-[17px]'>Login here</span>
                        </Link>
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <div onClick={handleGoogleRegister} className='w-28 h-12 cursor-pointer rounded-xl bg-[#DA453A] flex justify-center items-center '>
                        <FaGoogle className='text-white text-xl' />
                    </div>
                    <div className='w-28 h-12 cursor-pointer rounded-xl bg-[#3B5998] flex justify-center items-center '>
                        <FaFacebookF className='text-white text-xl' />
                    </div>
                    <div className='w-28 h-12 cursor-pointer rounded-xl bg-[#1da1f2] flex justify-center items-center '>
                        <FaTwitter className='text-white text-xl' />
                    </div>
                </div>
                <div className="divider">OR</div>
                <div>
                    <input {...register("email", { required: true })} className='input focus:outline-0 w-full' placeholder='Email address' type="text" />
                    {errors.email && <span className='text-red-500'>Email must be required</span>}
                    <input {...register("password", { required: true })} className='input focus:outline-0 w-full' placeholder='Password' type="password" />
                    {errors.password && <span className='text-red-500'>Password must be required</span>}
                </div>
                <button type='submit' className='btn w-full text-[16px] bg-[#003A5A] text-white my-5'>
                    {loading ? <span class="loader"></span> : "SignUp"}
                </button>
            </form>
        </div>
    );
};

export default SignUp;