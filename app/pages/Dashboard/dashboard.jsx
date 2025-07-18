import React, { useState } from 'react';
import { Outlet } from 'react-router';
import DashboardNavigation from '../../components/Dashboard/DashboardNavigation/DashboardNavigation';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import useAdmin from '../../hooks/useAdmin';

const dashboard = () => {

    const [isToggle, setIstoggle] = useState(false)
    const [admin] = useAdmin()
    console.log('checking dashboard admin', admin);

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