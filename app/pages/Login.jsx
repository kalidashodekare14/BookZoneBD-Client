import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaFacebookF, FaGoogle, FaRegEyeSlash, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import axiosSecure from '../utils/axiosSecure';

const Login = () => {

    const { loginSystem, googleAuthSystem, setLoading, loading } = useAuth()
    const navigation = useNavigate()
    const [idError, setIsError] = useState(false);
    const [passwordHideAndShow, setPasswordHideAndShow] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        loginSystem(data.email, data.password)
            .then(async (res) => {
                const userInfo = {
                    email: data.email,
                    password: data.password
                }
                try {
                    setLoading(true)
                    const response = await axiosSecure.post('/api/user/login', userInfo);
                    if (response.data.success === true) {
                        localStorage.setItem('token', response.data.data.token);
                        navigation('/')
                    }

                } catch (error) {
                    setIsError(true)
                } finally {
                    setLoading(false);
                }

            })
            .catch(error => {
                setIsError(true)
                setLoading(false)
            })
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
                    navigation('/login');
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
        <div className='flex justify-center items-center font-mixed lg:h-[600px]  py-5 bg-[#F0F2F5]'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-8 lg:w-[30%] w-[95%]'>
                <div className='text-center space-y-2 my-5'>
                    <h1 className='text-2xl font-semibold'>Login to your account</h1>
                    <p className='text-[#5a5a5a] space-x-2'>
                        <span>Don't have an account?</span>
                        <Link to={"/signup"}>
                            <span className='text-[#3BB77E] cursor-pointer text-[17px]'>Sign Up Free!</span>
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
                    idError && <p className='text-red-500'>Your email or password doesn't match.</p>
                }
                <div className='flex justify-between items-center my-4'>
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" defaultChecked className="checkbox" />
                        <p className='text-[#5a5a5a]'>Remember me</p>
                    </div>
                    <p className='text-[#3BB77E] cursor-pointer'>Forget Password?</p>
                </div>
                <button type='submit' className='btn w-full text-[16px] bg-[#003A5A] text-white'>
                    {loading ? <span class="loader"></span> : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;