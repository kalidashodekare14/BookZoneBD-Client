import React from 'react';
import Banner from '../components/HomePage/BannerSection/BannerSection'
import SpecialOffer from '../components/HomePage/SpecialOffer/SpecialDiscount';
import TrendingBooks from '../components/HomePage/TrendingBooks/TrendingBooks';
import AcademicBooks from '../components/HomePage/AcademicBooks/AcademicBooks';
import FamouseWriter from '../components/HomePage/FamouseWriter/FamouseWriter';
import useAdmin from '../hooks/useAdmin';


const HomePage = () => {

    return (
        <div className='mx-10 font-hindSiliguri'>
            <Banner />
            <SpecialOffer />
            <TrendingBooks />
            <AcademicBooks />
            <FamouseWriter />
        </div>
    );
};

export default HomePage;