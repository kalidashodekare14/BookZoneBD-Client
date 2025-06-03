import SectionTitle from '../../../hooks/SectionTitle';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

import { Navigation } from 'swiper/modules';

const AcademicBooks = () => {

    const { t } = useTranslation("homeTitle");
    const cardData = [
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
    ];

    return (
        <div>
            <SectionTitle title={t("academicBooks")} />
            <div className='my-10'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={true}
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
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        cardData.map(data => (
                            <SwiperSlide>
                                <div className=' border-2 border-[#bbb] hover:border-2 hover:border-[#003A5A] hover:duration-200 flex flex-col justify-center p-2'>
                                    <img className='w-full h-60 px-5' src={data.image} alt="" />
                                    <div className='mt-3 space-y-2'>
                                        <h1 className='font-semibold'>{data.title}</h1>
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
                                        <button className='btn w-full bg-[#003A5A] text-white'>Add to cart</button>
                                    </div>

                                </div>

                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default AcademicBooks;