import { useEffect } from 'react';
import { totalWriterFetched } from '../Redux/slice/publicDataSlice/totalWritersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';


const Writers = () => {

    const { writerData, loading, error } = useSelector((state) => state.allWriterData);
    const dispatch = useDispatch();
    const cardLoading = 10;
    

    console.log('checking authors', writerData)

    useEffect(() => {
        dispatch(totalWriterFetched());
    }, [])



    return (
        <div className='mx-5 my-5 font-mixed'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-3'>
                {
                    writerData.length > 0 ? (
                        writerData.map(writer => (
                            <div className='border-2 border-[#bbb] hover:border-[#003A5A] hover:duration-300 rounded-2xl cursor-pointer  flex flex-col justify-center items-center p-5 space-y-3'>
                                <img className='w-32 h-32 rounded-full' src={writer?.image} alt="" />
                                <p className='text-xl'>{writer?.name}</p>
                                <Link to={`/writer/${writer._id}`}>
                                    <button className='btn w-52 bg-[#003A5A] text-white'>View Details</button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        [...Array(cardLoading)].map((_, index) => (
                            <div className='border-2 border-[#bbb] rounded-2xl flex flex-col justify-center items-center p-5 space-y-3'>
                                <div className="skeleton h-32 w-32 rounded-full"></div>
                                <div className="skeleton h-6 w-40"></div>
                                <div className="skeleton h-9 w-52"></div>
                            </div>
                        ))
                    )

                }
            </div>
        </div>
    );
};

export default Writers;