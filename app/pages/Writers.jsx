import { useEffect } from 'react';
import { totalWriterFetched } from '../Redux/slice/publicDataSlice/totalWritersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
const writersInfo = [
    {
        "name": "রবীন্দ্রনাথ ঠাকুর",
        "image": "https://i.ibb.co/gFykz0s1/Rabindranath-Tagore.jpg"
    },
    {
        "name": "কাজী নজরুল ইসলাম",
        "image": "https://i.ibb.co/W498zBLq/image-138937-1716554514.jpg"
    },
    {
        "name": "হুমায়ূন আহমেদ",
        "image": "https://i.ibb.co/4nhjzjty/65254-humayun.webp"
    },
    {
        "name": "সেলিনা হোসেন",
        "image": "https://i.ibb.co/xSmCgkRr/1556349567.jpg"
    },
    {
        "name": "জাফর ইকবাল",
        "image": "https://i.ibb.co/prGyzWZN/250px-Muhammed-Zafar-Iqbal-by-NKS-3.jpg"
    },
    {
        "name": "আহমদ ছফা",
        "image": "https://i.ibb.co/1GR2Y3Gt/image-15749-1538661158.jpg"
    },
    {
        "name": "মুনির চৌধুরী",
        "image": "https://i.ibb.co/1GR2Y3Gt/image-15749-1538661158.jpg"
    },
    {
        "name": "শরৎচন্দ্র চট্টোপাধ্যায়",
        "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfYvlOv-Z6JGzpr5ZJ0uGj_nbDMFlhr2R3A7GQR_zXP1PUOS4V9h51UdwUDhszdDsU7Uk_NHtHTyttZZVSP6w4Ng"
    },
    {
        "name": "মাইকেল মধুসূদন দত্ত",
        "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQO3PQLCFbzJkWPQGMnIgxvlhLxns8vfE73pS1RfmbK64ZA69e66pwIvK2Gx3YWhDjJBFaHa_LaAOeWce2fmmRT7Q"
    },
    {
        "name": "সুনীল গঙ্গোপাধ্যায়",
        "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCdg9GIAue7ev8J0IQiysxAkB430UexSu814WMEQtb_cPlJo9kZoQ5MovyemPUnFBzxGUQ2IXMFw8cm-G3mUIg8A"
    },
    {
        "name": "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
        "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSuFnh8mh6WfiAXU0jGmRiP6EXFQK5PefgnEiQIFNLtsMKGfXby9-mC7zefO-w8aTjLLzQdprFK7byzNd-SWuNbA"
    },
    {
        "name": "মানিক বন্দ্যোপাধ্যায়",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjaozSZyJJzdKL-bZHSGEqcCyifXnEa0yxKkRWSrcLvqHU4aZJxcJ49J3ucjRoqptSepUrdOmAJy05ZFT8Goocjg"
    },
    {
        "name": "সেলিনা হোসেন",
        "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcStpXUOe7mkwZO7d5q93lifbHwj2Cpv8b9g5X6bYeNiTzmHWgZaWMHigkkE6tPoSPPqnN33eVdwY_47-tbKQWd6z9wxRxp4-N2QmgzqfQ"
    },
    {
        "name": "আনিসুজ্জামান",
        "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR9Wt1ZtxMQ9l01j3tN-UwKVVN1mb_yAykzEDjZhvfmWFAPQjU1MtpEM4fa-1OcFNDQ2rzXUYKvrfZsuFyiIBV2RA"
    },
    {
        "name": "আনোয়ার পাশা",
        "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRx__EcO352y4IiCHnYxkrsn88MIkO7ZzsB4GNa-MnLkU63WdHA"
    }
];

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