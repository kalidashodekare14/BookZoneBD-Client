import SectionTitle from '../../../hooks/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperNavButton from '../../SwiperCustomization/SwiperNavButton';

import { Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

const FamouseWriter = () => {

    const { t } = useTranslation("homeTitle");

    const famouseWriterData = [
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
        }
    ];


    return (
        <div className='my-10'>
            <SectionTitle title={t("famouseWriter")} />
            <div className='my-10'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
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
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        famouseWriterData.map(writer => (
                            <SwiperSlide>
                                <div className='flex flex-col justify-center items-center gap-3'>
                                    <img className='h-32 w-32 rounded-full' src={writer.image} alt="" />
                                    <p className='text-xl'>{writer.name}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    <SwiperNavButton />
                </Swiper>
            </div>
        </div>
    );
};

export default FamouseWriter;