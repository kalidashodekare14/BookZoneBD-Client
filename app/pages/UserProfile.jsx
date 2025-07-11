import React, { useEffect, useState } from 'react';
import { FaEdit, FaInfo, FaLock } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { profileData } from '../Redux/profileSlice';
import useAuth from '../hooks/useAuth';
import axios from 'axios';


const UserProfile = () => {

    const { user } = useAuth()
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { userData, loading, error } = useSelector(state => state.profile);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(profileData({ email: user?.email }))
    }, [user])




    return (
        <div className='min-h-screen font-mixed flex justify-center items-center bg-[#e0e0e0]'>
            <div className='w-[60%] bg-white p-5'>
                <div className='flex justify-between items-center '>
                    <div className="w-32 mb-5 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://i.ibb.co/WcTWxsN/nav-img.png" />
                    </div>
                    <div onClick={onOpenModal}>
                        <FaEdit className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='space-y-3'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Name</label>
                        <p className='input focus:outline-0 w-full' type="text" />
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Date Of Birth</label>
                            <p className='input focus:outline-0 w-full'></p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Gender</label>
                            <p className='border border-[#bbb] py-[7px] px-2 rounded-[5px]'>Female</p>

                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Email</label>
                        <p className='input focus:outline-0 w-full' >{userData?.email}</p>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Address</label>
                        <p className='input focus:outline-0 w-full' ></p>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Contact Number</label>
                        <p className='input focus:outline-0 w-full'></p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">City</label>
                            <p className='input focus:outline-0 w-full'></p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">State</label>
                            <p className='input focus:outline-0 w-full' ></p>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <Modal open={open} onClose={onCloseModal} center>
                    <div className='flex justify-center items-center'>
                        <div className="relative w-20 mb-5 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://i.ibb.co/WcTWxsN/nav-img.png" />
                            <div className='absolute bottom-0 right-0 bg-[#cfcfcf] p-2 rounded-full'>
                                <FaCamera className=' text-xl' />
                            </div>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Name</label>
                            <input className='input focus:outline-0 w-full' type="text" />
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Date Of Birth</label>
                                <input className='input focus:outline-0 w-full' type="date" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Gender</label>
                                <select className='border border-[#bbb] py-[6px] rounded-[5px]' name="" id="">
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                    <option value="">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Email</label>
                            <input className='input focus:outline-0 w-full' type="email" />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Address</label>
                            <input className='input focus:outline-0 w-full' type="text" />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Contact Number</label>
                            <input className='input focus:outline-0 w-full' type="text" />
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">City</label>
                                <input className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">State</label>
                                <input className='input focus:outline-0 w-full' type="text" />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default UserProfile;