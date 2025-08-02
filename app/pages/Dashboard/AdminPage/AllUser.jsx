import React, { useEffect, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardAllUser } from '../../../Redux/slice/dashboardSlice/allUserSlice';
import { OrbitProgress } from 'react-loading-indicators';
import { CiSearch } from 'react-icons/ci';
import ReactPaginate from 'react-paginate';

const allUser = [
    {
        "name": "Rahim Uddin",
        "email": "rahim.uddin@example.com",
        "image": "https://randomuser.me/api/portraits/men/1.jpg",
        "phone": "+8801711001100"
    },
    {
        "name": "Karima Akter",
        "email": "karima.akter@example.com",
        "image": "https://randomuser.me/api/portraits/women/2.jpg",
        "phone": "+8801722002200"
    },
    {
        "name": "Sumon Ali",
        "email": "sumon.ali@example.com",
        "image": "https://randomuser.me/api/portraits/men/3.jpg",
        "phone": "+8801733003300"
    },
    {
        "name": "Fatema Khatun",
        "email": "fatema.khatun@example.com",
        "image": "https://randomuser.me/api/portraits/women/4.jpg",
        "phone": "+8801744004400"
    },
    {
        "name": "Nasir Hossain",
        "email": "nasir.hossain@example.com",
        "image": "https://randomuser.me/api/portraits/men/5.jpg",
        "phone": "+8801755005500"
    },
    {
        "name": "Jannatul Ferdous",
        "email": "jannatul.ferdous@example.com",
        "image": "https://randomuser.me/api/portraits/women/6.jpg",
        "phone": "+8801766006600"
    },
    {
        "name": "Alamin Sarker",
        "email": "alamin.sarker@example.com",
        "image": "https://randomuser.me/api/portraits/men/7.jpg",
        "phone": "+8801777007700"
    },
    {
        "name": "Shirin Akhter",
        "email": "shirin.akhter@example.com",
        "image": "https://randomuser.me/api/portraits/women/8.jpg",
        "phone": "+8801788008800"
    },
    {
        "name": "Rafiq Mia",
        "email": "rafiq.mia@example.com",
        "image": "https://randomuser.me/api/portraits/men/9.jpg",
        "phone": "+8801799009900"
    },
    {
        "name": "Nusrat Jahan",
        "email": "nusrat.jahan@example.com",
        "image": "https://randomuser.me/api/portraits/women/10.jpg",
        "phone": "+8801700010000"
    }
]

const AllUsers = () => {

    const { totalUser, totalPages, loading, error } = useSelector((state) => state.totalUser);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const [isSearch, setIsSearch] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        const search = event.target.search.value;
        setIsSearch(search)
    }


    useEffect(() => {
        const params = new URLSearchParams({
            search: isSearch || "",
            page: currentPage + 1,
            limit: limit
        })
        dispatch(dashboardAllUser({ params: params.toString() }))
    }, [isSearch, currentPage, limit])


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
        <div className='px-5 py-5 bg-[#E0E0E0] font-mixed space-y-3'>
            <div className='flex justify-between items-center bg-white p-3 rounded-xl'>
                <p className='font-semibold'>Users Manager</p>
                <form onSubmit={handleSearch} className='flex items-center border border-[#bbb] rounded-[10px] p-2'>
                    <input className='focus:outline-0 border-[#bbb] w-60' name='search' placeholder='Search email' type="text" />
                    <button type='submit'>
                        <CiSearch className='cursor-pointer text-xl' />
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr className='text-[16px]'>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalUser.map(user => (
                                <tr className='text-[15px]'>
                                    <th>
                                        <img className='w-14 h-14 rounded-full' src={user?.image ? user.image : "https://i.ibb.co/WcTWxsN/nav-img.png"} alt="" />
                                    </th>
                                    <td>{user?.name ? user?.name : "N/A"}</td>
                                    <td>{user?.email ? user?.email : "N/A"}</td>
                                    <td>{user?.contact_number ? user?.contact_number : "N/A"}</td>
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <div tabIndex={0} role="button" className="btn m-1"><HiDotsVertical /></div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                            <li><a>Item 1</a></li>
                                            <li><a>Item 2</a></li>
                                        </ul>
                                    </div>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className='my-10 flex justify-center items-center'>
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
            </div>
        </div>
    );
};

export default AllUsers;