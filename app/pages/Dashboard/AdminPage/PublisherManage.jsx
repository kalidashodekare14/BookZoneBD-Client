import { useEffect, useState } from 'react';
import { publisherManageFatched, publisherDataUpdate, publisherDataDelete } from '../../../Redux/slice/dashboardSlice/publishersManageSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { CiSearch } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FaCamera } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`

const AuthorManage = () => {

    const { totalpublisher, totalPages, loading, error } = useSelector((state) => state.totalPublisher);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const [isSearch, setIsSearch] = useState(null);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [imageHosting, setImageHosting] = useState("");
    const [imgHostingLoading, setImgHostingLoading] = useState(false);
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [publisherBio, setPublisherBio] = useState("")
    const loadingPublisher = 10;


    useEffect(() => {
        setImageHosting(selectedPublisher?.publisher_image)
    }, [selectedPublisher?.publisher_image])

    useEffect(() => {
        setPublisherBio(selectedPublisher?.publisher_description)
    }, [selectedPublisher?.publisher_description])



    useEffect(() => {
        const params = new URLSearchParams({
            search: isSearch,
            page: currentPage + 1,
            limit: limit
        })
        dispatch(publisherManageFatched({ params }))
    }, [isSearch, currentPage, limit])

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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        try {
            console.log(data)
            if (!publisherBio) {
                return
            }
            const publisherInfo = {
                publisher_name: data.publisher_name,
                publisher_website: data.publisher_website,
                publisher_description: publisherBio
            }
            dispatch(publisherDataUpdate({ id: selectedPublisher._id, data: publisherInfo }));
            if (!loading) {
                onCloseModal()
            }
        } catch (error) {
            console.error(error.message);
        }

    }


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    dispatch(publisherDataDelete({ id: id }))
                    if (!loading) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your publish data has been deleted.",
                            icon: "success"
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
                <p className='font-semibold '>Authors Manage</p>
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
                            <th>Website</th>
                            <th>Bio</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalpublisher.length > 0 ? (
                                totalpublisher.map(publisher => (
                                    <tr className='text-[15px]'>
                                        <th>
                                            <img className='w-14 h-14 rounded-full' src={publisher?.publisher_image ? publisher.publisher_image : "https://i.ibb.co/WcTWxsN/nav-img.png"} alt="" />
                                        </th>
                                        <td>{publisher?.publisher_name ? publisher?.publisher_name : "N/A"}</td>
                                        <td>
                                            <Link className='text-[#3bb77c]' to={publisher?.publisher_website} target='_blank'>
                                                {publisher?.publisher_website ? publisher?.publisher_website : "N/A"}
                                            </Link>

                                        </td>
                                        <td>{publisher?.publisher_description ? publisher?.publisher_description.slice(0, 40) : "N/A"} {publisher?.publisher_description.length > 40 && "..."}</td>
                                        <td>
                                            <div className="dropdown dropdown-bottom dropdown-end">
                                                <div tabIndex={0} role="button" className="btn m-1"><HiDotsVertical /></div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-2">
                                                    <li onClick={() => { onOpenModal(), setSelectedPublisher(publisher) }} className='bg-[#0081a7] text-white p-2 cursor-pointer'>Edit</li>
                                                    <li onClick={() => handleDelete(publisher._id)} className='bg-[#d00000] text-white p-2 cursor-pointer'>Delete</li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    {loading && (
                                        <>
                                            {[...Array(loadingPublisher)].map((_, index) => (
                                                <tr>
                                                    <td>
                                                        <div className="skeleton h-14 w-14 rounded-full"></div>
                                                    </td>
                                                    <td>
                                                        <div className="skeleton h-8 w-40"></div>
                                                    </td>
                                                    <td>
                                                        <div className="skeleton h-8 w-40"></div>
                                                    </td>
                                                    <td>
                                                        <div className="skeleton h-8 w-52"></div>
                                                    </td>
                                                    <td>
                                                        <div className="skeleton h-10 w-16"></div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                    {
                                        !loading && (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td className='font-semibold'>No Data</td>
                                                <td></td>
                                            </tr>
                                        )
                                    }
                                </>
                            )

                        }
                    </tbody>
                </table>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <div>
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col lg:flex-row items-center gap-4'>
                            <div>
                                <label htmlFor="">Name</label>
                                <input {...register("publisher_name", { required: true })} className='input focus:outline-0 w-full' defaultValue={selectedPublisher?.publisher_name} placeholder='Edit name' type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Website</label>
                                <input {...register("publisher_website", { required: true })} className='input focus:outline-0 w-full' defaultValue={selectedPublisher?.publisher_website} placeholder='Edit website' type="text" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Bio</label>
                            <textarea onChange={(event) => setPublisherBio(event.target.value)} value={publisherBio} className='textarea focus:outline-0 w-full h-32' placeholder='Edit website' type="text" />
                        </div>
                        <div className='flex justify-center items-center mt-5'>
                            <button className='btn bg-[#003a5a] text-white'>Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <div className='my-10 flex justify-center items-center'>
                {
                    totalpublisher.length > 0 && (
                        <div className='bg-white p-4'>
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

export default AuthorManage;