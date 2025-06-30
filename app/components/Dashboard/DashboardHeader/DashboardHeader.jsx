import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FaBarsStaggered } from 'react-icons/fa6'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { LuMessageSquare } from 'react-icons/lu'


const DashboardHeader = ({ isToggle, handleToggle }) => {

    const [isDropdownToggle, setIsDropdownToggle] = useState(false)


    const handleDropdownToggle = () => {
        setIsDropdownToggle(!isDropdownToggle)
    }

    return (
        <div className=' shadow-2xs py-3 lg:px-10 px-3 flex justify-between items-center'>
            <div className='duration-500 transition-transform'>
                {
                    isToggle ? (
                        <FaArrowRight onClick={handleToggle} className='lg:hidden text-2xl cursor-pointer transform rotate-180' />
                    ) : (
                        <FaBarsStaggered onClick={handleToggle} className='lg:hidden text-2xl cursor-pointer transform' />
                    )
                }
            </div>
            <div className='flex items-center gap-5'>
                <div className='relative cursor-pointer'>
                    <div className='relative'>
                        <IoMdNotificationsOutline className='text-3xl text-[#307bc4]' />
                    </div>
                    <div className='w-6 h-6 flex justify-center items-center absolute -top-2 -right-2 bg-[#307bc4] rounded-full'>
                        <span className='text-white'>10</span>
                    </div>
                </div>
                <div className='relative cursor-pointer'>
                    <div className='relative'>
                        <LuMessageSquare className='text-2xl text-[#307bc4]' />
                    </div>
                    <div className='w-6 h-6 flex justify-center items-center absolute -top-3 -right-2 bg-[#307bc4] rounded-full'>
                        <span className='text-white'>15</span>
                    </div>
                </div>
                <div className='flex items-center '>
                    <div onClick={handleDropdownToggle} className='z-10  flex justify-end items-center  gap-3 pr-3 h-[40px] font-rubik bg-none lg:bg-gradient-to-r from-[#307ac43a] to-[#307ac42c]  rounded-full'>
                        <div className='relative z-20 cursor-pointer w-[40px] h-[40px] rounded-full bg-white'>
                            <img
                                className='w-full h-full rounded-full'
                                src={"https://i.ibb.co/WcTWxsN/nav-img.png"}
                                width={500}
                                height={300}
                                alt='image'
                            />
                            {/* {
                                    isDropdownToggle && (
                                        <div className={`absolute -left-1/2 w-52 h-auto  bg-white shadow-lg space-y-2`}>
                                            <Link href={'/dashboard/profile'}>
                                                <div className='hover:bg-[#307bc4] border-b hover:text-white p-2'>
                                                    <h1>Profile</h1>
                                                </div>
                                            </Link>
                                            <div onClick={() => signOut()} className='hover:bg-[#307bc4] border-b hover:text-white p-2'>
                                                <h1>Logout</h1>
                                            </div>
                                        </div>
                                    )
                                } */}
                        </div>
                        <p className='lg:flex hidden text-[#307bc4]'>
                            <span>Hello,</span>
                            <span className='font-bold'>Kalidash</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader