import { useState } from 'react';
import { Outlet } from 'react-router';
import DashboardNavigation from '../../components/Dashboard/DashboardNavigation/DashboardNavigation';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import useAdmin from '../../hooks/useAdmin';

const dashboard = () => {

    const [isToggle, setIstoggle] = useState(false)
    const [admin] = useAdmin()

    const handleToggle = () => {
        setIstoggle(!isToggle)
    }

    return (
        <div className='flex overflow-hidden'>
            <DashboardNavigation isToggle={isToggle} />
            <div className='w-full overflow-x-auto'>
                <DashboardHeader isToggle={isToggle} handleToggle={handleToggle} />
                <Outlet />
            </div>
        </div>
    );
};

export default dashboard;