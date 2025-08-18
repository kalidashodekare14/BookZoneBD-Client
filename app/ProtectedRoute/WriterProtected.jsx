import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { OrbitProgress } from 'react-loading-indicators';
import useRole from '../hooks/useRole';

const WriterProtected = () => {
    const { user, loading, logoutSystem } = useAuth();
    const location = useLocation();
    const { isRole, roleLoading } = useRole()


    if (loading || roleLoading) {
        return <div className='h-[550px] flex flex-col justify-center items-center'>
            <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
            <p className='text-xl'>Please wait...</p>
        </div>
    }

    if (!user) {
        return <Navigate to={'/login'} replace state={{ from: location }} />
    }

    if (isRole !== "Writer") {
        logoutSystem()
        return <Navigate to={'/login'} replace state={{ from: location }} />
    }

    return <Outlet />

};

export default WriterProtected;