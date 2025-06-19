import React from 'react';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className=' flex justify-center items-center font-mixed h-[600px] bg-[#F0F2F5]'>
            <div className='bg-white p-8'>
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
                    <div className='w-28 h-12 cursor-pointer rounded-xl bg-[#3B5998] flex justify-center items-center '>
                        <FaFacebookF className='text-white text-xl' />
                    </div>
                    <div className='w-28 h-12 cursor-pointer rounded-xl bg-[#DA453A] flex justify-center items-center '>
                        <FaGoogle className='text-white text-xl' />
                    </div>
                    <div className='w-28 h-12 cursor-pointer rounded-xl bg-[#1da1f2] flex justify-center items-center '>
                        <FaTwitter className='text-white text-xl' />
                    </div>
                </div>
                <div className="divider">OR</div>
                <div>
                    <input className='input focus:outline-0 w-full' placeholder='Email address' type="text" />
                    <input className='input focus:outline-0 w-full' placeholder='Password' type="password" />
                </div>
                <div className='flex justify-between items-center my-4'>
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" defaultChecked className="checkbox" />
                        <p className='text-[#5a5a5a]'>Remember me</p>
                    </div>
                    <p className='text-[#3BB77E] cursor-pointer'>Forget Password?</p>
                </div>
                <button className='btn w-full text-[16px] bg-[#003A5A] text-white'>Login</button>
            </div>
        </div>
    );
};

export default Login;