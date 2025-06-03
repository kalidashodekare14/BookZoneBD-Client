
import SectionTitle from '../../../hooks/SectionTitle';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

import { Navigation } from 'swiper/modules';

const SpecialDiscount = () => {

    const { t } = useTranslation("homeTitle");


    const cardData = [
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
    ]



    return (
        <div>
            <SectionTitle title={t("specialDiscount")} />
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

export default SpecialDiscount;