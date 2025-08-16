import React, { useEffect, useState } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { OrbitProgress } from 'react-loading-indicators';
import axiosSecure from '../../../utils/axiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`

const AddBook = () => {

    const [isBookImage, setIsBookImage] = useState("");
    const [imageHostingLoading, setImgHostingLoading] = useState(false);
    const [dropdownInfo, setDropdownInfo] = useState([])
    const [isDescription, setIsDescription] = useState("");
    const [bookLoading, setBookLoading] = useState(false);


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
                setIsBookImage(data.data.url);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setImgHostingLoading(false)
        }
    }

    console.log('checking author and publisher', dropdownInfo)

    // authors get
    useEffect(() => {
        const totalAuthorFetched = async () => {
            const res = await axiosSecure.get('/api/dashboard/authorAndPublisherGet');
            return setDropdownInfo(res.data.data)
        }
        totalAuthorFetched()
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const bookData = {
                title: data.title,
                author_id: data.author_id,
                publisher: data.publisher_id,
                price: parseInt(data.price),
                stock: parseInt(data.stock),
                discount: parseInt(data.discount),
                category: data.category,
                subCategory: data.subCategory,
                description: isDescription,
                image: isBookImage
            }
            console.log('checking final data', bookData)
            setBookLoading(true)
            const res = await axiosSecure.post('/api/dashboard/total_book_add', bookData)
            if (res.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Book added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                setIsBookImage("");
            }
        } catch (error) {
            console.log(error)
        } finally {
            setBookLoading(false);
        }

    }


    return (
        <div className='font-mixed bg-[#E0E0E0]'>
            <div className='flex flex-col lg:flex-row p-3 gap-5'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-3'>
                    <div className='bg-white p-3 rounded-xl'>
                        <h1 className='text-xl my-2'>General Information</h1>
                        <div className='w-full'>
                            <p>Book Title</p>
                            <input {...register("title")} className='input w-full focus:outline-0' type="text" />
                        </div>
                        <div className='w-full'>
                            <p>Description</p>
                            <textarea onChange={(event) => setIsDescription(event.target.value)} className='textarea w-full focus:outline-0' name="" id=""></textarea>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='w-full'>
                                <p>Author</p>
                                <select {...register("author_id")} className='border border-[#bbb] p-[6px] w-full'>
                                    {
                                        dropdownInfo?.totalAuthor?.map((publisher) => (
                                            <option key={publisher._id} value={publisher?._id}>{publisher?.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='w-full'>
                                <p>Publisher</p>
                                <select {...register("publisher_id")} className='border border-[#bbb] p-[6px] w-full'>
                                    {
                                        dropdownInfo?.totalPublisher?.map((publisher) => (
                                            <option key={publisher._id} value={publisher?._id}>{publisher?.publisher_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-3 rounded-xl'>
                        <h1 className='text-xl my-2'>Pricing And Stock</h1>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            <div className='w-full'>
                                <p>Base pricing</p>
                                <input {...register("price")} className='input w-full focus:outline-0' type="text" />
                            </div>
                            <div className='w-full'>
                                <p>Stock</p>
                                <input {...register("stock")} className='input w-full focus:outline-0' type="text" />
                            </div>
                            <div className='w-full'>
                                <p>Discount</p>
                                <input {...register("discount")} className='input w-full focus:outline-0' type="text" />
                            </div>
                            <div className='w-full'>
                                <p>Category</p>
                                <input {...register("category")} className='input w-full focus:outline-0' type="text" />
                            </div>
                            <div className='w-full'>
                                <p>Sub Category</p>
                                <input {...register("subCategory")} className='input w-full focus:outline-0' type="text" />
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-5'>
                            <button type='submit' className='btn bg-[#003a5a] text-white'>
                                {bookLoading ? <OrbitProgress color="#ffffff" size="small" text="" textColor="" /> : "Add Book"}
                            </button>
                        </div>
                    </div>
                </form>
                <div className='flex flex-col justify-center items-center bg-white border-5 border-[#bbb] border-dotted rounded-2xl lg:w-[50%] w-full'>
                    <div className=' mb-5'>
                        <img className='w-52 h-52' src={`${isBookImage ? isBookImage : "https://i.ibb.co/99NrFg3J/photo.png"}`} alt="" />
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
        </div>
    );
};

export default AddBook;