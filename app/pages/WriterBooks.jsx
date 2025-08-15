import React, { useEffect, useState } from 'react';
import axiosPublic from '../utils/axiosPublic';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { FaCamera, FaEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useWriter from '../hooks/useWriter';
import { writerBooksDataCreate, writerBooksFetched, writerBooksDataUpdate } from '../Redux/slice/writerBooksSlice'
import { useDispatch, useSelector } from 'react-redux';
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`

const WriterBooks = () => {

    const [isBooks, setIsBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [editOpen, setEditOpen] = useState(false);
    const onEditOpenModal = () => setEditOpen(true);
    const onEditCloseModal = () => setEditOpen(false);
    const [imageHosting, setImageHosting] = useState("")
    const [imgHostingLoading, setImgHostingLoading] = useState(false);
    const [isDiscription, setIsDiscription] = useState("")
    const { writerData, loading, error } = useWriter();
    const { writerBook, loading: writerLoading, error: writerError } = useSelector((state) => state.writerBooks);
    const dispatch = useDispatch()
    const [editData, setEditData] = useState(null);
    const [isUpdateDiscription, setIsUpdateDiscription] = useState("")
    const [updateBookImage, setUpdateBookImage] = useState("");
    const [editDescriptionError, setEditDescriptionError] = useState(false);

    useEffect(() => {
        setUpdateBookImage(editData?.image)
    }, [editData?.image])

    useEffect(() => {
        setIsUpdateDiscription(editData?.description)
    }, [editData?.description])

    useEffect(() => {
        dispatch(writerBooksFetched({ id: writerData?._id }))
    }, [writerData?._id, dispatch])



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
                setUpdateBookImage(data.data.url)
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
        formState: { errors },
    } = useForm()

    const {
        register: register1,
        handleSubmit: handleSubmit1,
        formState: { errors: errors1 },
    } = useForm()

    const onSubmit = (data) => {
        try {
            const booksInfo = {
                author_id: writerData?._id,
                image: imageHosting,
                title: data.title,
                category: data.category,
                subCategory: data.subcategory,
                price: data.price,
                discount: data.discount,
                publisher: data.publisher,
                stock: data.stock,
                description: isDiscription
            }
            dispatch(writerBooksDataCreate({ data: booksInfo }))
            if (writerLoading === false) {
                onCloseModal()
            }
        } catch (error) {
            console.log(error)
        } finally {

        }

    }

    const onEditSubmit = (data) => {
        try {

            if (!isUpdateDiscription) {
                return setEditDescriptionError(true);
            }

            const bookData = {
                title: data.title,
                category: data.category,
                subCategory: data.subCategory,
                price: data.price,
                discount: data.discount,
                publisher: data.publisher,
                stock: data.stock,
                description: isUpdateDiscription,
                image: updateBookImage
            }
            dispatch(writerBooksDataUpdate({ id: editData._id, data: bookData }))
            if (loading === false) {
                onEditCloseModal()
            }
        } catch (error) {
            console.error(error.message)
        }

    }


    return (
        <div className='lg:px-40 py-10 font-mixed  bg-[#e0e0e0] min-h-screen'>
            <div className='bg-white p-5 min-h-screen'>
                <div className='flex justify-between items-center mb-10'>
                    <h1 className='text-xl'>My Books</h1>
                    <button onClick={onOpenModal} className='btn bg-[#003a5a] text-white'>Add Book</button>
                </div>
                <div>
                    {
                        writerBook.length > 0 ? (
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                                {
                                    writerBook.slice(0, 5).map(book => (
                                        <div className='border border-[#bbb]'>
                                            <div onClick={() => { onEditOpenModal(), setEditData(book) }} className='flex justify-end p-3 cursor-pointer'>
                                                <FaEdit className='text-xl' />
                                            </div>
                                            <div className='flex flex-col lg:flex-row gap-3  p-3'>
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
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='flex justify-center items-center h-[500px]'>
                                <div className='flex flex-col justify-center items-center'>
                                    <img className='w-52' src={"https://i.ibb.co.com/GfQ9CjV6/9264885.jpg"} alt="" />
                                    <p>No data</p>
                                </div>
                            </div>
                        )
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
            {/* Edit Modal */}
            < Modal open={editOpen} onClose={onEditCloseModal} center>
                <div className=''>
                    <div className='flex justify-center items-center'>
                        <div className="relative w-28 h-28 mb-5 rounded-full">
                            <img
                                className='w-full h-full border border-[#bbb]'
                                src={updateBookImage ? updateBookImage : "https://i.ibb.co.com/VWY95b8T/photo-gallery.png"}
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
                    <form onSubmit={handleSubmit1(onEditSubmit)}>
                        <div className='flex flex-col'>
                            <label htmlFor="">Name</label>
                            <input {...register1("title", { required: true })} defaultValue={editData?.title} className={`input focus:outline-0 w-full ${errors1?.title && "border border-red-500"}`} type="text" />
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                            <div className='flex flex-col'>
                                <label htmlFor="">Category</label>
                                <input {...register1("category", { required: true })} defaultValue={editData?.category} className={`input focus:outline-0 w-full ${errors1?.category && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Sub-Category</label>
                                <input {...register1("subCategory", { required: true })} defaultValue={editData?.subCategory} className={`input focus:outline-0 w-full ${errors1?.subCategory && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Price</label>
                                <input {...register1("price", { required: true })} defaultValue={editData?.price} className={`input focus:outline-0 w-full ${errors1?.price && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Discount</label>
                                <input {...register1("discount", { required: true })} defaultValue={editData?.discount} className={`input focus:outline-0 w-full ${errors1?.discount && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Publisher</label>
                                <input {...register1("publisher", { required: true })} defaultValue={editData?.publisher} className={`input focus:outline-0 w-full ${errors1?.publisher && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Stock</label>
                                <input {...register1("stock", { required: true })} defaultValue={editData?.stock} className={`input focus:outline-0 w-full ${errors1?.stock && "border border-red-500"}`} type="text" />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Description</label>
                            <textarea onChange={(event) => setIsUpdateDiscription(event.target.value)} defaultValue={isUpdateDiscription} className={`textarea focus:outline-0 w-full h-32 ${editDescriptionError && "border border-red-500"}`} type="text" />
                        </div>
                        <div className='flex justify-center items-center mt-5'>
                            <button type='submit' className='btn bg-[#003A5A] text-white'>
                                {/* {loading ? <span class="loader"></span> : "Update here"} */}
                                Edit here
                            </button>
                        </div>
                    </form>
                </div>
            </ Modal>
        </div>
    );
};

export default WriterBooks;