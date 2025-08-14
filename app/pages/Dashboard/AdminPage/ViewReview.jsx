import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { totalReviewFetched } from '../../../Redux/slice/dashboardSlice/totalReviewSlice'
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { OrbitProgress } from 'react-loading-indicators';

const ViewReview = () => {

    const [isSearch, setIsSearch] = useState(null);
    const { reviewAllData, loading, error } = useSelector((state) => state.totalReview);
    const dispatch = useDispatch();

    console.log('checking review', reviewAllData);

    useEffect(() => {
        dispatch(totalReviewFetched());
    }, [])


    const handleSearch = (event) => {
        event.preventDefault();
        const search = event.target.search.value;
        setIsSearch(search)
    }


    // if (loading) {
    //     return <div className='h-[550px] flex flex-col justify-center items-center'>
    //         <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
    //         <p className='text-xl'>Please wait...</p>
    //     </div>
    // }


    return (
        <div className='lg:px-5 py-5 bg-[#E0E0E0] font-mixed space-y-3 min-h-screen'>
            <div className='flex justify-between items-center bg-[#ffffffc9] p-3 rounded-xl'>
                <p className='font-semibold text-[15px] lg:text-xl'>Reviews Manage</p>
                <form onSubmit={handleSearch} className='flex items-center breview breview-[#bbb] rounded-[10px] p-2'>
                    <input className='focus:outline-0 breview-[#bbb] w-60' name='search' placeholder='Search...' type="text" />
                    <button type='submit'>
                        <CiSearch className='cursor-pointer text-xl' />
                    </button>
                </form>
            </div>
            <div className="w-full overflow-x-auto rounded-box breview breview-base-content/5 bg-[#ffffffc9]">
                <div className='min-w-[1000px]'>
                    <table className="table">
                        <thead>
                            <tr className='text-[16px]'>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Date</th>
                                <th></th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviewAllData.length > 0 ? (
                                    reviewAllData.map(review => (
                                        <tr className='text-[15px]'>
                                            <th>
                                                <div>
                                                    <img className='lg:w-14 lg:h-14 w-14  h-14 rounded-full' src={review?.user_image ? review.user_image : "https://i.ibb.co/WcTWxsN/nav-img.png"} alt="" />
                                                </div>
                                            </th>
                                            <td>
                                                <div className='flex flex-col gap-1'>
                                                    <span className='font-bold'>{review?.user_name ? review?.user_name : "N/A"}</span>
                                                </div>
                                            </td>
                                            <td className=''>
                                                <Rating
                                                    style={{ maxWidth: 90 }}
                                                    value={review?.rating || 0}
                                                    readOnly
                                                />
                                            </td>
                                            <td>{review?.comment}</td>
                                            <td>
                                                <div className='flex flex-col'>
                                                    <span>{review?.createdAt ? new Date(review?.createdAt).toLocaleTimeString() : "N/A"}</span>
                                                    <span>{review?.createdAt ? new Date(review?.createdAt).toLocaleDateString() : "N/A"}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <select className='border border-[#bbb] p-1'>
                                                    <option value="">Approved</option>
                                                    <option value="">Hide</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="dropdown dropdown-bottom dropdown-end">
                                                    <div tabIndex={0} role="button" className="btn m-1"><HiDotsVertical /></div>
                                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                        <li className='bg-[#e63946] hover:bg-[#c51d2b] duration-300 text-white'>
                                                            <p>Delete</p>
                                                        </li>
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
                                        <td className='text-xl'>No Data</td>
                                    </tr>
                                )

                            }
                        </tbody>
                    </table>
                </div>
                <div className='my-10 flex justify-center items-center'>
                    {/* <ReactPaginate
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
                        pageClassName={'px-3 py-2 breview cursor-pointer'}
                        previousClassName={'px-3 py-2 breview cursor-pointer  hover:bg-[#003a5a] hover:text-white'}
                        nextClassName={'px-3 py-2 breview cursor-pointer  hover:bg-[#003a5a] hover:text-white'}
                        breakClassName={'px-3 py-2 breview cursor-pointer'}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default ViewReview;