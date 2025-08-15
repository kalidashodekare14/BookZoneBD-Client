import React, { useEffect, useState } from 'react';
import { publisherManageFatched } from '../../../Redux/slice/dashboardSlice/publishersManageSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { OrbitProgress } from 'react-loading-indicators';
import { CiSearch } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router';

const AuthorManage = () => {

    const { totalpublisher, totalPages, loading, error } = useSelector((state) => state.totalPublisher);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const [isSearch, setIsSearch] = useState(null);


    console.log('checking publisher', totalpublisher)

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

    if (loading) {
        return <div className='h-[550px] flex flex-col justify-center items-center'>
            <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
            <p className='text-xl'>Please wait...</p>
        </div>
    }


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
                                totalpublisher.map(author => (
                                    <tr className='text-[15px]'>
                                        <th>
                                            <img className='w-14 h-14 rounded-full' src={author?.publisher_image ? author.publisher_image : "https://i.ibb.co/WcTWxsN/nav-img.png"} alt="" />
                                        </th>
                                        <td>{author?.publisher_name ? author?.publisher_name : "N/A"}</td>
                                        <td>
                                            <Link className='text-[#3bb77c]' to={author?.publisher_website}>
                                                {author?.publisher_website ? author?.publisher_website : "N/A"}
                                            </Link>

                                        </td>
                                        <td>{author?.publisher_description ? author?.publisher_description.slice(0, 40) : "N/A"} {author?.publisher_description.length > 40 && "..."}</td>
                                        <td>
                                            <div className="dropdown dropdown-bottom dropdown-end">
                                                <div tabIndex={0} role="button" className="btn m-1"><HiDotsVertical /></div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                    <li>Edit</li>
                                                    <li className='bg-[#d00000] text-white'>Delete</li>
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
                                    <td></td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
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