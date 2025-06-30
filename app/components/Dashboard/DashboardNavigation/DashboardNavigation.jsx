import { BiSolidBookAdd } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { FaCartFlatbedSuitcase } from 'react-icons/fa6'
import { GiStarsStack } from 'react-icons/gi'
import { IoBookSharp } from 'react-icons/io5'
import { MdDashboard } from 'react-icons/md'
import { Link, useLocation } from 'react-router'

const DashboardNavigation = ({ isToggle }) => {

    const { pathname } = useLocation()

    const dashboardLinks = [
        {
            id: "1",
            name: "Dashboard",
            path: "/dashboard",
            icon: <MdDashboard />
        },
        {
            id: "2",
            name: "All Book",
            path: "/dashboard/all_book",
            icon: <IoBookSharp />
        },
        {
            id: "3",
            name: "Manage Users",
            path: "/dashboard/manage_users",
            icon: <FaUsers />
        },
        {
            id: "4",
            name: "Add Book",
            path: "/dashboard/add_book",
            icon: <BiSolidBookAdd />
        },
        {
            id: "5",
            name: "View Order",
            path: "/dashboard/view_order",
            icon: <FaCartFlatbedSuitcase />
        },
        {
            id: "6",
            name: "View Reviews",
            path: "/dashboard/view-review",
            icon: <GiStarsStack />
        },
    ]

    return (
        <div className='relative '>
            <div className={`${isToggle ? "translate-y-20 translate-x-0 duration-300" : "-translate-x-full translate-y-20 duration-300"} z-50 absolute lg:static lg:translate-y-0 lg:translate-x-0  left-0  bg-white w-52 border border-[#bbb] h-[650px]`}>
                <div className='flex flex-col gap-1 text-[16px] font-rubik'>
                    <div className='hidden lg:flex py-5 px-3'>
                        <img
                            src={""}
                            alt='logo'
                        />
                    </div>
                    {
                        dashboardLinks.map(navi => (
                            <Link key={navi.id} to={navi.path} className={`${pathname == navi.path ? "bg-[#307bc4] text-white  p-2 flex items-center gap-2" : "hover:bg-[#307bc4] hover:text-white p-2 flex items-center gap-2"}`} >
                                <p>{navi.icon}</p>
                                <p>{navi.name}</p>
                            </Link>
                        ))
                    }
                    <div className="divider">OR</div>
                    <Link to={'/'} className={`hover:bg-[#307bc4] hover:rounded-br-full hover:rounded-tr-xl hover:text-white p-2`}>
                        <p>Home</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavigation