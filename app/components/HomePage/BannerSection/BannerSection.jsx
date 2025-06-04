import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperNavButton from '../../SwiperCustomization/SwiperNavButton';

const BannerSection = () => {

    const bannerInfo = [
        {
            id: 1,
            image: "https://i.ibb.co/WN0JgfbY/img1.webp"
        },
        {
            id: 2,
            image: "https://i.ibb.co/fdrWgWf3/img2.webp"
        },
        {
            id: 3,
            image: "https://i.ibb.co/JFHVyDDP/img3.webp"
        },
        {
            id: 4,
            image: "https://i.ibb.co/4gjtwyGn/img4.webp"
        },
    ]

    return (
        <div className='relative z-10 my-10 2xl'>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper">
                {
                    bannerInfo.map(banner => (
                        <SwiperSlide className='rounded-2xl' key={banner.id}>
                            <img className='rounded-2xl w-full lg:h-80 h-32' src={banner.image} alt="" />
                        </SwiperSlide>
                    ))
                }
                <SwiperNavButton />
            </Swiper>
        </div>
    );
};

export default BannerSection;