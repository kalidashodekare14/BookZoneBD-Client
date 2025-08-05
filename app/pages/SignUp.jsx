import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaFacebookF, FaGoogle, FaRegEyeSlash, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import axiosSecure from '../utils/axiosSecure';

const SignUp = () => {

    const { registerSystem, googleAuthSystem, setLoading, loading, logoutSystem } = useAuth()
    const navigation = useNavigate();
    const [passwordHideAndShow, setPasswordHideAndShow] = useState(false)
    const [isError, setIsError] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const userInfo = {
                email: data.email,
                password: data.password
            }
            setLoading(true)
            const response = await axiosSecure.post('/api/user/register', userInfo);
            if (response.data.success === true) {
                localStorage.setItem('token', response.data.data.token);
                registerSystem(data.email, data.password)
                    .then(async (res) => {
                        navigation('/');
                    })
                    .catch(error => {
                        setLoading(false)
                        setIsError(true)
                    })
            }
        } catch (error) {
        } finally {
            setLoading(false)
        }

    }

    const handleGoogleRegister = () => {
        googleAuthSystem()
            .then(async (res) => {
                try {
                    const userInfo = {
                        email: res.user.email,
                        name: res.user.displayName,
                        image: res.user.photoURL,
                        isGoogleUser: true,
                    }
                    setLoading(true)
                    const response = await axiosSecure.post('/api/user/google_auth', userInfo);
                    if (response.data.success === true) {
                        localStorage.setItem('token', response.data.data.token);
                        navigation('/');
                    }
                } catch (error) {
                    logoutSystem()
                    navigation('/signup');
                } finally {
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                setIsError(true)
            })
    }

    const handlePasswordShowAndPassword = () => {
        setPasswordHideAndShow(!passwordHideAndShow)
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
                    <div className='flex items-center border border-[#bbb] rounded-[5px]'>
                        <input {...register("password", { required: true })} className='input border-0 focus:outline-0 w-full' placeholder='Password' type={passwordHideAndShow ? "text" : "password"} />
                        {
                            passwordHideAndShow ? <FaRegEyeSlash onClick={handlePasswordShowAndPassword} className='text-xl cursor-pointer' /> : <FaEye onClick={handlePasswordShowAndPassword} className='text-xl cursor-pointer' />
                        }
                    </div>
                    {errors.password && <span className='text-red-500'>Password must be required</span>}
                </div>
                {
                    isError && <p className='text-red-500'>Your email already exits</p>
                }
                <button type='submit' className='btn w-full text-[16px] bg-[#003A5A] text-white my-5'>
                    {loading ? <span class="loader"></span> : "SignUp"}
                </button>
            </form>
        </div>
    );
};

export default SignUp;