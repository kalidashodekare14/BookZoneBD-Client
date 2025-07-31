import React, { useEffect, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardTotalBooks } from '../../../Redux/slice/dashboardSlice/allBookSlice'
import { OrbitProgress } from 'react-loading-indicators';
import ReactPaginate from 'react-paginate';
import { CiSearch } from "react-icons/ci";

const allBookData = [
    {
        "image": "https://i.ibb.co/gMg3m1Zw/potherpachali.png",
        "title": "পথের পাঁচালী",
        "author": "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
        "rating": 4.8,
        "price": 2000,
        "discount": 25
    },
    {
        "image": "https://i.ibb.co/BH9jWVcF/image.png",
        "title": "দেবদাস",
        "author": "শরৎচন্দ্র চট্টোপাধ্যায়",
        "rating": 4.5,
        "price": 1500,
        "discount": 30
    },
    {
        "image": "https://i.ibb.co/VYHprhzN/image.png",
        "title": "ফেলুদা সমগ্র",
        "author": "সত্যজিৎ রায়",
        "rating": 4.9,
        "price": 1800,
        "discount": 20
    },
    {
        "image": "https://i.ibb.co/WNP3HVTS/image.png",
        "title": "হুমায়ূন আহমেদের সেরা উপন্যাস",
        "author": "হুমায়ূন আহমেদ",
        "rating": 4.7,
        "price": 2500,
        "discount": 35
    },
    {
        "image": "https://i.ibb.co/PsPVwLFk/image.png",
        "title": "প্রাচীন বাংলা সাহিত্য",
        "author": "ড. মুহম্মদ এনামুল হক",
        "rating": 4.3,
        "price": 2000,
        "discount": 40
    },
    {
        "image": "https://i.ibb.co/VYHprhzN/image.png",
        "title": "ফেলুদা সমগ্র",
        "author": "সত্যজিৎ রায়",
        "rating": 4.9,
        "price": 1900,
        "discount": 20
    },
    {
        "image": "https://i.ibb.co/0jQHJ58k/image.png",
        "title": "রবীন্দ্র রচনাবলী",
        "author": "রবীন্দ্রনাথ ঠাকুর",
        "rating": 5.00,
        "price": 1900,
        "discount": 20
    },
    {
        "image": "https://i.ibb.co/Z6frB18p/image.png",
        "title": "অচিন পাখি",
        "author": "হুমায়ূন আহমেদ",
        "rating": 4.8,
        "price": 1500,
        "discount": 15
    },
    {
        "image": "https://i.ibb.co/PZfFjpKq/image.png",
        "title": "তিতাস একটি নদীর নাম",
        "author": "অদ্বৈত মল্লবর্মণ",
        "rating": 4.6,
        "price": 2500,
        "discount": 10
    },
    {
        "image": "https://i.ibb.co/FQzx9zY/image.png",
        "title": "প্যারাডক্সিকাল সাজিদ",
        "author": "আরিফ আজাদ",
        "rating": 4.7,
        "price": 2800,
        "discount": 25
    },
    {
        "image": "https://i.ibb.co/Mxw5GTsZ/image.png",
        "title": "দুই দুয়ারি",
        "author": "সেলিনা হোসেন",
        "rating": 4.3,
        "price": 2500,
        "discount": 18
    },
    {
        "image": "https://i.ibb.co/Mxw5GTsZ/image.png",
        "title": "আমার বন্ধু রাশেদ",
        "author": "জাফর ইকবাল",
        "rating": 4.9,
        "price": 3000,
        "discount": 30
    },
    {
        "image": "https://i.ibb.co/4w2HZnhX/image.png",
        "title": "শেষের কবিতা",
        "author": "রবীন্দ্রনাথ ঠাকুর",
        "rating": 4.8,
        "price": 2000,
        "discount": 20
    },
    {
        "image": "https://i.ibb.co/sdvsTKyy/image.png",
        "title": "বাংলা ১ম পত্র - ক্লাস ৫",
        "author": "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক",
        "rating": 4.5,
        "price": 180,
        "discount": 10
    },
    {
        "image": "https://i.ibb.co/xqRYkCkn/image.png",
        "title": "গণিত - ক্লাস ৮",
        "author": "এনসিটিবি",
        "rating": 4.6,
        "price": 200,
        "discount": 15
    },
    {
        "image": "https://i.ibb.co/B5FnVZkm/1735721362.webp",
        "title": "বিশ্ববিদ্যালয় ভর্তি গাইড",
        "author": "শিক্ষা একাডেমি",
        "rating": 4.7,
        "price": 450,
        "discount": 20
    },
    {
        "image": "https://i.ibb.co/wNywPdCC/image.png",
        "title": "সাধারণ জ্ঞান (BCS গাইড)",
        "author": "সুমন সাহা",
        "rating": 4.6,
        "price": 380,
        "discount": 18
    },
    {
        "image": "https://i.ibb.co/xq1vggjR/61i-w-S0-LX0-L-SY342.jpg",
        "title": "Programming in C",
        "author": "ড. জাহাঙ্গীর হোসেন",
        "rating": 4.6,
        "price": 550,
        "discount": 15
    },
    {
        "image": "https://i.ibb.co/B2wHCMFp/viber-image-2022-12-26-14-04-10-447.jpg",
        "title": "Applied Statistics",
        "author": "সাদিক হাসান",
        "rating": 4.7,
        "price": 580,
        "discount": 12
    },
    {
        "image": "https://i.ibb.co/8DKjCCTq/image.png",
        "title": "বিজ্ঞান - ক্লাস ৯",
        "author": "এনসিটিবি",
        "rating": 4.4,
        "price": 220,
        "discount": 12
    }
]


const AllBook = () => {

    const { totalBook, totalPages, loading, error } = useSelector((state) => state.totalBooks);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const [isSearch, setIsSearch] = useState(null);

    console.log('checking currentpage', currentPage)

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

    if (loading) {
        return <div className='h-[550px] flex flex-col justify-center items-center'>
            <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
            <p className='text-xl'>Please wait...</p>
        </div>
    }

    return (
        <div className='px-5 py-5 bg-[#E0E0E0] font-mixed space-y-3'>
            <div className='flex justify-between items-center bg-white p-3 rounded-xl'>
                <p className='font-semibold'>All Book</p>
                <form onSubmit={handleSearch} className='flex items-center border border-[#bbb] rounded-[10px] p-2'>
                    <input className='focus:outline-0 border-[#bbb] w-60' name='search' placeholder='Search...' type="text" />
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
                            <th>Author</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalBook.slice(0, 6).map(books => (
                                <tr className='text-[15px]'>
                                    <th>
                                        <img className='w-14 h-14 rounded-full' src={books.image} alt="" />
                                    </th>
                                    <td>{books.title}</td>
                                    <td>{books.author}</td>
                                    <td>৳{books.price}</td>
                                    <td>{books.discount}%</td>
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

export default AllBook;