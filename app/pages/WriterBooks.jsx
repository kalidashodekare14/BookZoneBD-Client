import React, { useEffect, useState } from 'react';
import axiosPublic from '../utils/axiosPublic';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { FaCamera } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`

const WriterBooks = () => {

    const [isBooks, setIsBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [imageHosting, setImageHosting] = useState("")
    const [imgHostingLoading, setImgHostingLoading] = useState(false);
    const [isDiscription, setIsDiscription] = useState("")

    useEffect(() => {
        const booksDataFetched = async () => {
            const res = await axiosPublic.get('/api/public/special_discount');
            setIsBooks(res.data.data)
        }
        booksDataFetched()
    }, [])


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

    const onSubmit = (data) => {
        const booksInfo = {
            title: data.title,
            category: data.category,
            subcategory: data.subcategory,
            price: data.price,
            discount: data.discount,
            publisher: data.publisher,
            publisher: data.publisher,
            description: isDiscription
        }

        

    }



    return (
        <div className='lg:px-40 py-10 font-mixed  bg-[#e0e0e0] min-h-screen'>
            <div className='bg-white p-5 min-h-screen'>
                <div className='flex justify-between items-center mb-10'>
                    <h1 className='text-xl'>My Books</h1>
                    <button onClick={onOpenModal} className='btn bg-[#003a5a] text-white'>Add Book</button>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {
                        isBooks.length > 0 ? (
                            isBooks.slice(0, 5).map(book => (
                                <div className='flex flex-col lg:flex-row gap-3 border border-[#bbb] p-3'>
                                    <img className='w-full h-full' src={book?.image} alt="" />
                                    <div className='space-y-2'>
                                        <p className='font-bold text-[17px]'>{book?.title}</p>
                                        <div className='list'>
                                            <li className='text-[16px]'><span className='font-semibold'>Catygory:</span> {book?.category}</li>
                                            <li className='text-[16px]'><span className='font-semibold'>Sub Category:</span> {book?.subcategory}</li>
                                            <li className='text-[16px]'><span className='font-semibold'>Discount:</span> {book?.discount}%</li>
                                            <li className='text-[16px]'><span className='font-semibold'>Price:</span> ৳{book?.price}</li>
                                            <li className='text-[16px]'><span className='font-semibold'>Publisher:</span> {book?.publisher}</li>
                                            <li className='text-[16px]'><span className='font-semibold'>Stock:</span> {book?.stock}</li>
                                            <li className='text-[16px]'><span className='font-semibold'>Description:</span> {book?.description.slice(0, 100)}...</li>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : ("")
                    }
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <div className=''>
                    <div className='flex justify-center items-center'>
                        <div className="relative w-28 h-28 mb-5 rounded-full">
                            <img
                                className='w-full h-full'
                                src={imageHosting ? imageHosting : "https://i.ibb.co.com/VWY95b8T/photo-gallery.png"}
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col'>
                            <label htmlFor="">Name</label>
                            <input {...register("title", { required: true })} className='input focus:outline-0 w-full' type="text" />
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                            <div className='flex flex-col'>
                                <label htmlFor="">Category</label>
                                <input {...register("category", { required: true })} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Sub-Category</label>
                                <input {...register("subcategory", { required: true })} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Price</label>
                                <input {...register("price", { required: true })} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Discount</label>
                                <input {...register("discount", { required: true })} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Publisher</label>
                                <input {...register("publisher", { required: true })} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Stock</label>
                                <input {...register("stock", { required: true })} className='input focus:outline-0 w-full' type="text" />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Description</label>
                            <textarea onChange={(event) => setIsDiscription(event.target.value)} className='textarea focus:outline-0 w-full' type="text" />
                        </div>
                        <div className='flex justify-center items-center'>
                            <button type='submit' className='btn bg-[#003A5A] text-white'>
                                {/* {loading ? <span class="loader"></span> : "Update here"} */}
                                Update here
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default WriterBooks;