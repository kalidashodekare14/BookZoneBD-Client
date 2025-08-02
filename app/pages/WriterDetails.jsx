import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import { writerDetailsFetched } from '../Redux/slice/publicDataSlice/writerDetailsSlice'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const WriterDetails = () => {

    const { writer_id } = useParams();
    const { writerData, loading, error } = useSelector((state) => state.viewDetailWriter);
    const dispatch = useDispatch();

    console.log('checking data', writerData);

    useEffect(() => {
        dispatch(writerDetailsFetched({ id: writer_id }));
    }, [])


    return (
        <div className='px-32 font-mixed py-10 bg-[#e0e0e0]'>
            <div className='flex gap-5 bg-white p-5'>
                <div className='flex flex-col justify-center items-center'>
                    <img className='w-32 h-32 rounded-full' src={writerData?.writer_image} alt="" />
                    <div className='flex items-center gap-2'>
                        <span>0</span>
                        <span>followers</span>
                    </div>
                    <button className='btn w-32 bg-[#003a5a] text-white'>Follow</button>
                </div>
                <div>
                    <h2 className='text-xl'>{writerData?.writer_name}</h2>
                    <p>{writerData?.writer_bio}</p>
                </div>
            </div>
            <div className='bg-white p-5'>

                <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
                    {
                        writerData?.books.map(writer => (
                            <div className=' border-2 border-[#bbb] hover:border-2 hover:border-[#003A5A] hover:duration-200 flex flex-col justify-center p-2'>
                                <img className='w-full h-60 px-5' src={writer.image} alt="" />
                                <div className='mt-3 space-y-2'>
                                    <h1 className='font-semibold'>{writer.title.slice(0, 25)} {writer.title.length >= 25 && "..."} </h1>
                                    <p>{writer?.author?.author_name}</p>
                                    <Rating
                                        style={{ maxWidth: 100 }}
                                        value={3}
                                        readOnly
                                    />
                                    <div className='flex justify-between items-center'>
                                        <p>৳{writer.price * writer.discount / 100}</p>
                                        <p><del>৳{writer.price}</del></p>
                                    </div>
                                    <Link to={`/book/${writer._id}`}>
                                        <button className='btn w-full bg-[#003A5A] text-white'>View Details</button>
                                    </Link>
                                </div>

                            </div>
                        ))
                    }
                </div>


            </div>
        </div>
    );
};

export default WriterDetails;