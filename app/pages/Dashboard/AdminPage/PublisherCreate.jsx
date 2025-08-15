import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { IoMdCloudUpload } from "react-icons/io";
import axiosSecure from '../../../utils/axiosSecure';
import Swal from 'sweetalert2';
import { OrbitProgress } from 'react-loading-indicators';
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`

const PublisherCreate = () => {

    const [authorBio, setAuthoBio] = useState("");
    // const [isPublisherImage, setisPublisherImage] = useState("");
    const [isPublisherImage, setIsPublisherImage] = useState("");
    const [bioError, setBioError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageHostingLoading, setImgHostingLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

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
                setIsPublisherImage(data.data.url);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setImgHostingLoading(false)
        }
    }

    const onSubmit = async (data) => {
        try {
            if (authorBio.length === 0) {
                return setBioError(true)
            }
            const publisherData = {
                publisher_name: data.publisher_name,
                publisher_website: data.publisher_website,
                publisher_description: authorBio,
                publisher_image: isPublisherImage || ""
            }
            setLoading(true)
            const res = await axiosSecure.post('/api/dashboard/publiser_add', publisherData);
            if (res.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Author added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                setIsPublisherImage("")
            }
        } catch (error) {
            console.log('checking error', error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='px-5 py-5 bg-[#E0E0E0] font-mixed min-h-screen'>
            <div className='flex flex-col-reverse lg:flex-row  gap-10'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-5 space-y-2 w-full'>
                    <div className='flex flex-col lg:flex-row items-center gap-5'>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor="">Name</label>
                            <input {...register("publisher_name", { required: true })} className={`input focus:outline-0 w-full ${errors.author_name && "border border-red-400"}`} placeholder='Name' type="text" />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor="">Webiste</label>
                            <input {...register("publisher_website", { required: true })} className={`input  focus:outline-0 w-full ${errors.author_nationality && "border border-red-400"}`} placeholder='Website link' type="text" />
                        </div>
                    </div>
                    <div>
                        <textarea onChange={(event) => setAuthoBio(event.target.value)} className={`textarea ${bioError && "border border-red-500"} focus:outline-0 w-full h-52`} placeholder='Enter you bio' name="" id=""></textarea>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button type='submit' className='btn bg-[#003a5a] text-white'>{loading ? <OrbitProgress color="#ffffff" size="small" text="" textColor="" /> : "Create Author"}</button>
                    </div>
                </form>
                <div className='flex flex-col justify-center items-center bg-white border-5 border-[#bbb] border-dotted rounded-2xl lg:w-[50%] p-2'>
                    <div className='border-2 rounded-full mb-5'>
                        <img className='w-32 h-32 rounded-full' src={`${isPublisherImage ? isPublisherImage : "https://i.ibb.co/WcTWxsN/nav-img.png"}`} alt="" />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <IoMdCloudUpload className='text-3xl' />
                        <p>Drag files to upload</p>
                        <p>or</p>
                    </div>
                    <div onClick={() => document.querySelector('input[type="file"]').click()} className='flex flex-col justify-center items-center'>
                        {
                            imageHostingLoading ? (
                                <OrbitProgress variant="spokes" color="#003a5a" size="medium" text="" textColor="" />
                            ) : (
                                <button className='py-2 px-2 border rounded-full border-[#003a5a] text-black hover:bg-[#003a5a] hover:text-white duration-300'>Browse Files</button>
                            )
                        }

                        <input hidden onChange={handleImageHosting} type="file" />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PublisherCreate;