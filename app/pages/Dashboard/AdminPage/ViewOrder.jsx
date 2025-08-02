import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { orderManageFatched } from '../../../Redux/slice/dashboardSlice/orderManageSlice'
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router';

const ViewOrder = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const [isSearch, setIsSearch] = useState(null);
    const { totalOrder, loading, error } = useSelector((state) => state.totalOrders);
    const dispatch = useDispatch()

    console.log('checking total order', totalOrder)


    useEffect(() => {
        dispatch(orderManageFatched());
    }, [])


    const handleSearch = (event) => {
        event.preventDefault();
        const search = event.target.search.value;
        setIsSearch(search)
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
    }

    return (
        <div className='lg:px-5 py-5 bg-[#E0E0E0] font-mixed space-y-3 min-h-screen'>
            <div className='flex justify-between items-center bg-[#ffffffc9] p-3 rounded-xl'>
                <p className='font-semibold text-[15px] lg:text-xl'>Orders Manage</p>
                <form onSubmit={handleSearch} className='flex items-center border border-[#bbb] rounded-[10px] p-2'>
                    <input className='focus:outline-0 border-[#bbb] w-60' name='search' placeholder='Search...' type="text" />
                    <button type='submit'>
                        <CiSearch className='cursor-pointer text-xl' />
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-[#ffffffc9]">
                <table className="table">
                    <thead>
                        <tr className='text-[16px]'>
                            <th>Image</th>
                            <th>Info</th>
                            <th>Contact Number</th>
                            <th>Tran Id</th>
                            <th>Total order</th>
                            <th>Amount</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalOrder.map(order => (
                                <tr className='text-[15px]'>
                                    <th>
                                        <div>
                                            <img className='lg:w-14 lg:h-14 w-auto rounded-full' src={order?.image ? order.image : "https://i.ibb.co/WcTWxsN/nav-img.png"} alt="" />
                                        </div>
                                    </th>
                                    <td>
                                        <div className='flex flex-col gap-1'>
                                            <span className='font-bold'>{order?.customar_name ? order?.customar_name : "N/A"}</span>
                                            <span>{order?.customar_email ? order?.customar_email : "N/A"}</span>
                                        </div>
                                    </td>
                                    <td>{order?.addressData?.phone_number ? order?.addressData?.phone_number : "N/A"}</td>
                                    <td className=''>{order?.tran_id}</td>
                                    <td>{order?.products.length}</td>
                                    <td>৳{order?.amount}</td>
                                    <td>
                                        <div className='flex flex-col'>
                                            <span>{order?.createdAt ? new Date(order?.createdAt).toLocaleTimeString() : "N/A"}</span>
                                            <span>{order?.createdAt ? new Date(order?.createdAt).toLocaleDateString() : "N/A"}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <p className={`${order.status === "Success" && "bg-[#59b15a] text-white"} ${order.status === "Pending" && "bg-[#cc554c] text-white"} p-2 rounded-full`}>{order.status}</p>
                                    </td>
                                    <td>
                                        <div className="dropdown dropdown-bottom dropdown-end">
                                            <div tabIndex={0} role="button" className="btn m-1"><HiDotsVertical /></div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                <li>
                                                    <Link to={`details/${order._id}`}>Order Details</Link>
                                                </li>
                                                <li><a>Item 2</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
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
                        pageClassName={'px-3 py-2 border cursor-pointer'}
                        previousClassName={'px-3 py-2 border cursor-pointer  hover:bg-[#003a5a] hover:text-white'}
                        nextClassName={'px-3 py-2 border cursor-pointer  hover:bg-[#003a5a] hover:text-white'}
                        breakClassName={'px-3 py-2 border cursor-pointer'}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;