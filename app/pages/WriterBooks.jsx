import React, { useEffect, useState } from 'react';
import axiosPublic from '../utils/axiosPublic';

const WriterBooks = () => {

    const [isBooks, setIsBooks] = useState([]);

    useEffect(() => {
        const booksDataFetched = async () => {
            const res = await axiosPublic.get('/api/public/special_discount');
            setIsBooks(res.data.data)
        }
        booksDataFetched()
    }, [])



    return (
        <div className='lg:px-40 py-10 font-mixed  bg-[#e0e0e0] min-h-screen'>
            <div className='bg-white p-5 min-h-screen'>
                <div className='flex justify-between items-center mb-10'>
                    <h1 className='text-xl'>My Books</h1>
                    <button className='btn bg-[#003a5a] text-white'>Add Book</button>
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
        </div>
    );
};

export default WriterBooks;