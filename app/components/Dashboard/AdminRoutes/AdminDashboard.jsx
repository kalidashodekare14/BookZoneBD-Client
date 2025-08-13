import 'react-circular-progressbar/dist/styles.css';
import { MdOutlineShowChart } from 'react-icons/md';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import './AdminDashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { totalInformation } from '../../../Redux/slice/dashboardSlice/totalInfoSlice'
import { useEffect } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]


const AdminDashboard = () => {

    const { allInfo, loading, error } = useSelector((state) => state.totalInfo);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(totalInformation());
    }, [])

    // if (loading) {
    //     return <div className='h-[550px] flex flex-col justify-center items-center'>
    //         <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
    //         <p className='text-xl'>Please wait...</p>
    //     </div>
    // }


    return (
        <div className='font-mixed p-5 bg-[#E0E0E0] h-[585px]'>
            <div className='my-10 grid grid-cols-1 lg:grid-cols-4 gap-5'>

                {
                    loading ? (
                        <div className="skeleton border border-[#bbb] h-24 w-full">
                        </div>
                    ) : (
                        <div className='bg-[#f8f8f8] rounded-xl  p-3 border border-[#bbb] flex flex-col gap-2'>
                            <h1 className='text-[18px]'>Total Earned</h1>
                            <div className='flex items-center gap-3'>
                                <p className='text-2xl font-semibold'>$50K</p>
                                <p className='text-[14px] flex items-center gap-1 bg-[#3bb77d1c] text-[#3bb77dd0] font-semibold w-20 p-1 rounded-full'>
                                    <span>+95%</span>
                                    <span><MdOutlineShowChart className='text-[20px]' /></span>
                                </p>
                            </div>
                        </div>
                    )
                }
                {
                    loading ? (
                        <div className="skeleton border border-[#bbb] h-24 w-full">
                        </div>
                    ) : (
                        <div className='bg-[#f8f8f8] rounded-xl p-3 border border-[#bbb] flex flex-col gap-2'>
                            <h1 className='text-[18px]'>Total Users</h1>
                            <div className='flex items-center gap-3'>
                                <p className='text-2xl font-semibold'>{allInfo?.totalUsers.value ? allInfo?.totalUsers.value : 0}</p>
                                <p className='text-[14px] flex items-center gap-1 bg-[#3bb77d1c] text-[#3bb77dd0] font-semibold w-20 p-1 rounded-full'>
                                    <span>+75%</span>
                                    <span><MdOutlineShowChart className='text-[20px]' /></span>
                                </p>
                            </div>
                        </div>
                    )
                }

                {
                    loading ? (
                        <div className="skeleton border border-[#bbb] h-24 w-full">
                        </div>
                    ) : (
                        <div className='bg-[#f8f8f8] rounded-xl p-3 border border-[#bbb] flex flex-col gap-2'>
                            <h1 className='text-[18px]'>Total Books</h1>
                            <div className='flex items-center gap-3'>
                                <p className='text-2xl font-semibold'>{allInfo?.totalBooks.value ? allInfo?.totalBooks.value : 0}</p>
                                <p className='text-[14px] flex items-center gap-1 bg-[#3bb77d1c] text-[#3bb77dd0] font-semibold w-20 p-1 rounded-full'>
                                    <span>+80%</span>
                                    <span><MdOutlineShowChart className='text-[20px]' /></span>
                                </p>
                            </div>
                        </div>
                    )
                }

                {
                    loading ? (
                        <div className="skeleton border border-[#bbb] h-24 w-full">
                        </div>
                    ) : (
                        <div className='bg-[#f8f8f8] rounded-xl p-3 border border-[#bbb] flex flex-col gap-2'>
                            <h1 className='text-[18px]'>Total Orders</h1>
                            <div className='flex items-center gap-3'>
                                <p className='text-2xl font-semibold'>1500</p>
                                <p className='text-[14px] flex items-center gap-1 bg-[#3bb77d1c] text-[#3bb77dd0] font-semibold w-20 p-1 rounded-full'>
                                    <span>+60%</span>
                                    <span><MdOutlineShowChart className='text-[20px]' /></span>
                                </p>
                            </div>
                        </div>
                    )
                }

            </div>
            {
                loading ? (
                    <div className='skeleton h-80 w-[70%]'></div>
                ) : (
                    <div className='flex'>
                        <div className='bg-[#f8f8f8] w-[70%] rounded-2xl'>
                            <AreaChart width={750} height={350} data={data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                            </AreaChart>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default AdminDashboard;