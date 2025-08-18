import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useSwiper } from 'swiper/react';

const SwiperNavButton = () => {

    const swiper = useSwiper();

    return (
        <div className='flex justify-between items-center '>
            <button onClick={() => swiper.slidePrev()} className='btn text-2xl bg-[#003A5A] text-white border-0  absolute top-1/2 left-0 z-20'><FaAngleLeft /></button>
            <button onClick={() => swiper.slideNext()} className='btn text-2xl bg-[#003A5A] text-white border-0 absolute top-1/2 right-0 z-20'><FaAngleRight /></button>
        </div>
    );
};

export default SwiperNavButton;