import SectionTitle from '../../../hooks/SectionTitle';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

import { Navigation } from 'swiper/modules';
import SwiperNavButton from '../../SwiperCustomization/SwiperNavButton';
import { trendingBooksFetched } from '../../../Redux/slice/publicDataSlice/trendingBooksSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router';
const cardData = [
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
    }
]

const TrendingBooks = () => {

    const { t } = useTranslation("homeTitle");
    const { trendingBook, loading, error } = useSelector((state) => state.trendingBooks);
    const dispatch = useDispatch()
    const cardLoading = 10;

    

    useEffect(() => {
        dispatch(trendingBooksFetched());
    }, [])



    return (
        <div>
            <SectionTitle title={t("trendingBooks")} />
            <div className='my-10'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={8}
                    // navigation={true}
                    breakpoints={{
                        '@0.00': {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        '@0.75': {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        '@1.00': {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        '@1.50': {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        trendingBook.length > 0 ? (
                            trendingBook.map(data => (
                                <SwiperSlide>
                                    <div className=' border-2 border-[#bbb] hover:border-2 hover:border-[#003A5A] hover:duration-200 flex flex-col justify-center p-2'>
                                        <img className='w-full h-60 px-5' src={data.image} alt="" />
                                        <div className='mt-3 space-y-2'>
                                            <h1 className='font-semibold'>{data.title.slice(0, 25)} {data.title.length >= 25 && "..."} </h1>
                                            <p>{data.author}</p>
                                            <Rating
                                                style={{ maxWidth: 100 }}
                                                value={3}
                                                readOnly
                                            />
                                            <div className='flex justify-between items-center'>
                                                <p>৳{data.price * data.discount / 100}</p>
                                                <p><del>৳{data.price}</del></p>
                                            </div>
                                            <Link to={`/book/${data._id}`}>
                                                <button className='btn w-full bg-[#003A5A] text-white'>View Details</button>
                                            </Link>
                                        </div>

                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            [...Array(cardLoading)].map((_, index) => (
                                <SwiperSlide>
                                    <div className='border border-[#bbb] w-60 p-5'>
                                        <div className="flex w-52 flex-col gap-4">
                                            <div className="skeleton h-52 w-full"></div>
                                            <div className="skeleton h-4 w-40"></div>
                                            <div className="skeleton h-4 w-32"></div>
                                            <div className="skeleton h-4 w-40"></div>
                                            <div className='flex items-center gap-5'>
                                                <div className="skeleton h-4 w-full"></div>
                                                <div className="skeleton h-4 w-full"></div>
                                            </div>
                                            <div className='flex items-center gap-5'>
                                                <div className="skeleton h-8 w-full"></div>
                                                <div className="skeleton h-8 w-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        )
                    }
                    <SwiperNavButton />
                </Swiper>
            </div>
        </div>
    );
};

export default TrendingBooks;