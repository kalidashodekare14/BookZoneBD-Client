import React from 'react';
import Banner from '../components/HomePage/BannerSection/BannerSection'
import SpecialOffer from '../components/HomePage/BannerSection/SpecialOffer/SpecialDiscount';
import TrendingBooks from '../components/HomePage/TrendingBooks/TrendingBooks';


const HomePage = () => {

    return (
        <div className='mx-10 font-hindSiliguri'>
            <Banner />
            <SpecialOffer />
            <TrendingBooks />
        </div>
    );
};

export default HomePage;