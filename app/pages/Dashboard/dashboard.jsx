import React, { useState } from 'react';
import { Outlet } from 'react-router';
import DashboardNavigation from '../../components/Dashboard/DashboardNavigation/DashboardNavigation';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';

const dashboard = () => {

    const [isToggle, setIstoggle] = useState(false)

    const handleToggle = () => {
        setIstoggle(!isToggle)
    }

    return (
        <div className='flex'>
            <DashboardNavigation isToggle={isToggle} />
            <div className='w-full'>
                <DashboardHeader isToggle={isToggle} handleToggle={handleToggle} />
                <Outlet />
            </div>
        </div>
    );
};

export default dashboard;