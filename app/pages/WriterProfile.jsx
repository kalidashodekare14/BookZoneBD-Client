import React, { useEffect, useState } from 'react';
import { FaCamera, FaEdit } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { writerProfileFetched, writerProfileDataUpdate } from '../Redux/slice/writerProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';
import useWriter from '../hooks/useWriter';
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`

const WriterProfile = () => {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { user, userImageUpdate } = useAuth()
    // const { writerData, loading, error } = useSelector((state) => state.writerProfile);
    const { writerData, loading, error } = useWriter()
    const dispatch = useDispatch();
    const [imageHosting, setImageHosting] = useState("")
    const [imgHostingLoading, setImgHostingLoading] = useState(false);
    const [isDiscription, setIsDiscription] = useState("")

    useEffect(() => {
        setIsDiscription(writerData?.description)
    }, [writerData?.description])

    useEffect(() => {
        setImageHosting(writerData?.image)
    }, [writerData?.image])


    useEffect(() => {
        dispatch(writerProfileFetched({ email: user?.email }))
    }, [user?.email, dispatch])

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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const updateData = {
                name: data.name,
                image: imageHosting,
                gender: data.gender,
                date_of_birth: data.date_of_birth,
                contact_number: data.contact_number,
                country: data.country,
                address: data.address,
                description: isDiscription
            }
            setImgHostingLoading(true)
            dispatch(writerProfileDataUpdate({ email: user?.email, data: updateData }));
            userImageUpdate(imageHosting)
            if (loading === false) {
                onCloseModal()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setImgHostingLoading(false);
        }
    }




    return (
        <div className='py-10 font-mixed flex justify-center items-center bg-[#e0e0e0]'>
            <div className='lg:w-[60%] bg-white p-5'>
                <div className='flex justify-between items-center '>
                    <div className="w-32 h-32 mb-5 rounded-full">
                        <img
                            className='w-full h-full rounded-full'
                            alt={"image"}
                            src={writerData?.image || "https://i.ibb.co/WcTWxsN/nav-img.png"} />
                    </div>
                    <div onClick={onOpenModal}>
                        <FaEdit className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='space-y-3'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Name</label>
                        <p className='border-b p-2 border-[#bbb] focus:outline-0 w-full'>{writerData?.name}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Date Of Birth</label>
                            <p className='border-b p-2 border-[#bbb] focus:outline-0 w-full'>{writerData?.date_of_birth}</p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Gender</label>
                            <p className='border-b p-2 border-[#bbb] w-full rounded-[5px]'>{writerData?.gender}</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Email</label>
                        <p className='border-b p-2 border-[#bbb] focus:outline-0 w-full'>{writerData?.email}</p>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Country</label>
                            <p className='border-b p-2 border-[#bbb] focus:outline-0 w-full' >{writerData?.country}</p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Phone Number</label>
                            <p className='border-b p-2 border-[#bbb] focus:outline-0 w-full'>{writerData?.contact_number}</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Address</label>
                        <p className='border-b p-2 border-[#bbb] focus:outline-0 w-full' >{writerData?.address}</p>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Bio</label>
                        <p className='border-b p-2 border-[#bbb] focus:outline-0 w-full' >{writerData?.description}</p>
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <div className='my-5'>
                    <div className='flex justify-center items-center'>
                        <div className="relative w-28 h-28 mb-5 rounded-full">
                            <img
                                className='w-full h-full rounded-full'
                                src={imageHosting ? imageHosting : "https://i.ibb.co/WcTWxsN/nav-img.png"}
                                alt={"image"}
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
                            <input {...register("name", { required: true })} defaultValue={writerData?.name} className='input focus:outline-0 w-full' type="text" />
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Date Of Birth</label>
                                <input {...register("date_of_birth", { required: true })} defaultValue={writerData?.date_of_birth} className='input focus:outline-0 w-full' type="date" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Gender</label>
                                <select {...register("gender", { required: true })} defaultValue={writerData?.gender} className='border border-[#bbb] p-2  rounded-[5px]'>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Country</label>
                                <input {...register("country", { required: true })} defaultValue={writerData?.country} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Phone Number</label>
                                <input {...register("contact_number", { required: true })} defaultValue={writerData?.contact_number} className='input focus:outline-0 w-full' type="text" />
                            </div>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Address</label>
                            <input {...register("address", { required: true })} defaultValue={writerData?.address} className='input focus:outline-0 w-full' type="text" />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Bio</label>
                            <textarea onChange={(event) => setIsDiscription(event.target.value)} defaultValue={isDiscription} className='textarea focus:outline-0 w-full h-32' name="" id=""></textarea>
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
    );
};

export default WriterProfile;