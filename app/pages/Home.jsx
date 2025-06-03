import React from 'react';
import Banner from '../components/HomePage/BannerSection/BannerSection'
import SpecialOffer from '../components/HomePage/BannerSection/SpecialOffer/SpecialDiscount';


const HomePage = () => {

    return (
        <div className='mx-10 font-hindSiliguri'>
            <Banner />
            <SpecialOffer />
        </div>
    );
};

export default HomePage;