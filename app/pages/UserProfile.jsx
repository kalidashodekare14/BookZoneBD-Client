import React, { useEffect, useState } from 'react';
import { FaEdit, FaInfo, FaLock } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { profileData, profileDataUpdate } from '../Redux/slice/profileSlice';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`

const UserProfile = () => {

    const { user } = useAuth()
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [isGender, setIsGender] = useState(null);
    const { userData, loading, error } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const [imageHosting, setImageHosting] = useState(null);
    const [imgHostingLoading, setImgHostingLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (!user) {
            navigate("/login");
            return null;
        }
    }, [])


    useEffect(() => {
        dispatch(profileData({ email: user?.email }))
    }, [user])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const userInfo = {
            name: data.name,
            date_of_birth: data.date_of_birth,
            gender: isGender,
            address: data.address,
            contact_number: data.contact_number,
            image: imageHosting

        }
        dispatch(profileDataUpdate({ email: user?.email, data: userInfo }));
        if (loading === false) {
            onCloseModal()
        }
    }

    const handleImageHosting = async (event) => {
        const imageSelected = event.target.files[0];
        setImgHostingLoading(true)
        const formData = new FormData()
        formData.append("image", imageSelected);
        try {
            const res = await fetch(`${IMG_HOSTING}`, {
                method: "POST",
                body: formData
            })
            const data = await res.json();
            if (data.success) {
                setImageHosting(data.data.url);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setImgHostingLoading(false)
        }
    }

    return (
        <div className='lg:h-[600px] font-mixed flex justify-center items-center bg-[#e0e0e0]'>
            {
                loading && (
                    <div className='h-40 flex justify-center items-center'>
                        <span class="loader"></span>
                    </div>
                )
            }

            <div className='lg:w-[60%] w-full bg-white p-5'>
                <div className='flex justify-between items-center '>
                    <div className="w-32 h-32 mb-5 rounded-full">
                        <img
                            className='w-full h-full rounded-full'
                            alt={userData?.name || "image"}
                            src={userData?.image || "https://i.ibb.co/WcTWxsN/nav-img.png"} />
                    </div>
                    <div onClick={onOpenModal}>
                        <FaEdit className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='space-y-3'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Name</label>
                        <p className='input focus:outline-0 w-full'>{userData?.name}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Date Of Birth</label>
                            <p className='input focus:outline-0 w-full'>{userData?.date_of_birth}</p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Gender</label>
                            <p className='input w-full rounded-[5px]'>{userData?.gender}</p>

                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Email</label>
                        <p className='input focus:outline-0 w-full'>{userData?.email && userData?.email}</p>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Address</label>
                        <p className='input focus:outline-0 w-full' >{userData?.address}</p>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Contact Number</label>
                        <p className='input focus:outline-0 w-full'>{userData?.contact_number}</p>
                    </div>
                </div>
                {/* Modal */}
                <Modal open={open} onClose={onCloseModal} center>
                    <div className='w-80'>
                        <div className='flex justify-center items-center'>
                            <div className="relative w-28 h-28 mb-5 rounded-full">
                                <img
                                    className='w-full h-full rounded-full'
                                    src={imageHosting ? imageHosting : "https://i.ibb.co/WcTWxsN/nav-img.png"}
                                    alt={userData?.name || "image"}
                                />

                                <div onClick={() => document.querySelector('input[type="file"]').click()} className={`absolute cursor-pointer bottom-0 right-0 ${imgHostingLoading ? "bg-[#39b9ca]" : "bg-[#cfcfcf]"}  p-2 w-10 h-10 flex justify-center items-center rounded-full`}>
                                    {
                                        imgHostingLoading ? <span class="loader"></span> : <FaCamera className=' text-xl' />
                                    }

                                    <input onChange={handleImageHosting} hidden type="file" />
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Name</label>
                                <input {...register("name")} defaultValue={userData?.name} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex lg:flex-row flex-col items-center gap-3'>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Date Of Birth</label>
                                    <input {...register("date_of_birth")} defaultValue={userData?.date_of_birth} className='input focus:outline-0 w-full' type="date" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Gender</label>
                                    <select onChange={(e) => setIsGender(e.target.value)} defaultValue={userData?.gender} className='border border-[#bbb] py-[6px] rounded-[5px]' name="" id="">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Address</label>
                                <input {...register("address")} defaultValue={userData?.address} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Contact Number</label>
                                <input {...register("contact_number")} defaultValue={userData?.contact_number} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex justify-center items-center'>
                                <button className='btn bg-[#003A5A] text-white'>
                                    {loading ? <span class="loader"></span> : "Update here"}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>

        </div>
    );
};

export default UserProfile;