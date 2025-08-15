import React, { useEffect, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardTotalBooks, dashboardBookUpdate, dashboardBookDelete } from '../../../Redux/slice/dashboardSlice/allBookSlice'
import { OrbitProgress } from 'react-loading-indicators';
import ReactPaginate from 'react-paginate';
import { CiSearch } from "react-icons/ci";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';
import Swal from 'sweetalert2';
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`


const AllBook = () => {

    const { totalBook, totalPages, loading, error } = useSelector((state) => state.totalBooks);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const [isSearch, setIsSearch] = useState(null);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [imageHosting, setImageHosting] = useState("")
    const [imgHostingLoading, setImgHostingLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isUpdateDiscription, setIsUpdateDiscription] = useState("");
    const [editDescriptionError, setEditDescriptionError] = useState(false);

    console.log('checking selected data', selectedBook)


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (selectedBook) {
            reset(selectedBook)
        }
    }, [selectedBook, reset])


    useEffect(() => {
        setImageHosting(selectedBook?.image)
    }, [selectedBook?.image])

    useEffect(() => {
        setIsUpdateDiscription(selectedBook?.description)
    }, [selectedBook?.description])


    useEffect(() => {
        const paramsData = new URLSearchParams(
            {
                page: currentPage + 1,
                limit: limit,
                search: isSearch || ""
            }
        )
        dispatch(dashboardTotalBooks({ paramsData }));
    }, [currentPage, isSearch, limit])


    const handleSearch = (event) => {
        event.preventDefault();
        const search = event.target.search.value;
        setIsSearch(search)
    }


    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
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


    const onSubmit = (data) => {
        try {
            const bookData = {
                title: data.title,
                category: data.category,
                subCategory: data.subCategory,
                price: data.price,
                discount: data.discount,
                publisher: data.publisher,
                stock: data.stock,
                description: isUpdateDiscription,
                image: imageHosting
            }
            dispatch(dashboardBookUpdate({ id: selectedBook?._id, data: bookData }))
            if (!loading) {
                onCloseModal();
            }

        } catch (error) {
            console.error(error.message)
        }

    }


    const handleDeleteBook = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete the book.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    
                    const res = await dispatch(dashboardBookDelete({ id: id }))

                    if (res.meta.requestStatus === "fulfilled") {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong while deleting.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.error(error.message);
                }


            }
        });
    }




    // if (loading) {
    //     return <div className='h-[550px] flex flex-col justify-center items-center'>
    //         <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
    //         <p className='text-xl'>Please wait...</p>
    //     </div>
    // }

    return (
        <div className='lg:px-5 px-2 py-5 bg-[#E0E0E0] font-mixed space-y-3 min-h-screen'>
            <div className='flex justify-between items-center bg-white p-3 rounded-xl'>
                <p className='font-semibold'>All Book</p>
                <form onSubmit={handleSearch} className='flex items-center border border-[#bbb] rounded-[10px] p-2'>
                    <input className='focus:outline-0 border-[#bbb] lg:w-60' name='search' placeholder='Search...' type="text" />
                    <button type='submit'>
                        <CiSearch className='cursor-pointer text-xl' />
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr className='text-[16px]'>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalBook.length > 0 ? (
                                totalBook.map(books => (
                                    <tr className='text-[15px]'>
                                        <th>
                                            <img className='w-14 h-14 rounded-full' src={books.image} alt="" />
                                        </th>
                                        <td>{books.title}</td>
                                        <td>{books?.author?.author_name}</td>
                                        <td>৳{books.price}</td>
                                        <td>{books.discount}%</td>
                                        <td>
                                            <div className="dropdown dropdown-left dropdown-end">
                                                <div tabIndex={0} role="button" className="btn m-1"><HiDotsVertical /></div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-2">
                                                    <li onClick={() => { setSelectedBook(books), onOpenModal() }} className='bg-[#0081a7] text-white p-2 cursor-pointer'>Edit</li>
                                                    <li onClick={() => handleDeleteBook(books._id)} className='bg-[#d00000] text-white p-2 cursor-pointer'>Delete</li>
                                                </ul>
                                            </div>  
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className='text-[18px]'>No Data</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
            < Modal open={open} onClose={onCloseModal} center>
                <div className=''>
                    <div className='flex justify-center items-center'>
                        <div className="relative w-28 h-28 mb-5 rounded-full">
                            <img
                                className='w-full h-full border border-[#bbb]'
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
                            <input {...register("title", { required: true })} defaultValue={selectedBook?.title} className={`input focus:outline-0 w-full ${errors?.title && "border border-red-500"}`} type="text" />
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                            <div className='flex flex-col'>
                                <label htmlFor="">Category</label>
                                <input {...register("category", { required: true })} defaultValue={selectedBook?.category} className={`input focus:outline-0 w-full ${errors?.category && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Sub-Category</label>
                                <input {...register("subCategory", { required: true })} defaultValue={selectedBook?.subCategory} className={`input focus:outline-0 w-full ${errors?.subCategory && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Price</label>
                                <input {...register("price", { required: true })} defaultValue={selectedBook?.price} className={`input focus:outline-0 w-full ${errors?.price && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Discount</label>
                                <input {...register("discount", { required: true })} defaultValue={selectedBook?.discount} className={`input focus:outline-0 w-full ${errors?.discount && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Publisher</label>
                                <input {...register("publisher", { required: true })} defaultValue={selectedBook?.publisher} className={`input focus:outline-0 w-full ${errors?.publisher && "border border-red-500"}`} type="text" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Stock</label>
                                <input {...register("stock", { required: true })} defaultValue={selectedBook?.stock} className={`input focus:outline-0 w-full ${errors?.stock && "border border-red-500"}`} type="text" />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Description</label>
                            <textarea onChange={(event) => setIsUpdateDiscription(event.target.value)} value={isUpdateDiscription} className={`textarea focus:outline-0 w-full h-32 ${editDescriptionError && "border border-red-500"}`} type="text" />
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
            <div className='my-10 flex justify-center items-center  p-3 rounded-2xl'>
                {
                    totalBook.length > 0 && (
                        <div className='bg-white p-4 rounded-xl'>
                            <ReactPaginate
                                forcePage={currentPage}
                                previousLabel={'← Previous'}
                                nextLabel={'Next →'}
                                breakLabel={'...'}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={'flex flex-wrap items-center gap-2'}
                                activeClassName={'bg-[#003a5a] text-white'}
                                pageClassName={'px-3 py-2 border cursor-pointer'}
                                previousClassName={'px-3 py-2 border cursor-pointer  hover:bg-[#003a5a] hover:text-white'}
                                nextClassName={'px-3 py-2 border cursor-pointer  hover:bg-[#003a5a] hover:text-white'}
                                breakClassName={'px-3 py-2 border cursor-pointer'}
                            />
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default AllBook;