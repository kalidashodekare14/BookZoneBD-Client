import React, { useState } from 'react';
import { FaEdit, FaInfo, FaLock } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const UserProfile = () => {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

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
                <Modal open={open} onClose={onCloseModal} center>
                    <h2>Simple centered modal</h2>
                </Modal>
            </div>
        </div>
    );
};

export default UserProfile;