import '../i18n';
import { useEffect, useState } from "react";
import { FaBars, FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import './Navbar.css'
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { useCart } from 'react-use-cart';
import axiosPublic from '../utils/axiosPublic';
import axiosSecure from '../utils/axiosSecure';
import logo from '/logo.png'


const Navbar = () => {

    const { t, i18n } = useTranslation("navbar")
    const changeLanguage = (lng) => i18n.changeLanguage(lng);
    const [toggle, setToggle] = useState(false);
    const [lanSelect, setLanSelect] = useState("")
    const [active, setActive] = useState(false)
    const { pathname } = useLocation()
    const { user, loading: loadingAuth, logoutSystem } = useAuth();
    const { userData, loading, error } = useSelector((state) => state.profile);
    const [searchInput, setSearchInput] = useState(null);
    const navigate = useNavigate();
    const { totalUniqueItems } = useCart()
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const userRoleFetched = async () => {
            const res = await axiosSecure.get('/api/userInfo/user_role');
            setUserRole(res.data.role)
        }
        if (user?.email) {
            userRoleFetched();
        }
    }, [user?.email])


    const handleNavToggle = () => {
        setToggle(!toggle)
    }

    const handleLanguageSelect = (event) => {
        setLanSelect(event);
        changeLanguage(event);
    }


    const routeInfo = [
        {
            id: 1,
            name: t("routes.home"),
            route: "/"
        },
        {
            id: 2,
            name: t("routes.book"),
            route: "/books"
        },
        {
            id: 3,
            name: t("routes.categories"),
            route: "/categories"
        },
        {
            id: 4,
            name: t("routes.subject"),
            route: "/subjects"
        },
        {
            id: 5,
            name: t("routes.writer"),
            route: "/writers"
        },
        {
            id: 6,
            name: t("routes.publisher"),
            route: "/publisher"
        },
    ]

    const lang = [
        {
            id: 1,
            name: "EN",
            value: "en"
        },
        {
            id: 2,
            name: "BN",
            value: "bn"
        }
    ]


    const handleLogOut = () => {
        logoutSystem()
        localStorage.removeItem('token');
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchInput.trim()) {
            navigate(`/books?search=${searchInput}`);
            setSearchInput("")
        }
    }

    return (
        <div className=" px-5 font-mixed relative bg-[#003A5A] text-white">
            {/*  */}
            <div className="flex items-center justify-between py-5">
                <div className="pr-10">
                    {/* <h1 className="lg:text-3xl text-2xl">BookShopBD</h1> */}
                    <img className='w-52' src={logo} alt="" />
                </div>
                <form onSubmit={handleSearch} className="hidden relative w-[50%] lg:flex items-center">
                    <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} className="w-full bg-white text-black focus:outline-0 px-5 py-3 rounded-full border border-[#bbb]" placeholder="Search" type="text" />
                    <div className="absolute top-0 right-0 bg-[#3BB77E] h-full w-14 rounded-r-full flex justify-center items-center cursor-pointer">
                        <button type='submit'>
                            <IoIosSearch className="text-3xl text-white" />
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-between lg:gap-8 gap-5">
                    {
                        loadingAuth ? (
                            <div className="skeleton w-10 h-10 rounded-full"></div>
                        ) : user ? (
                            <div className="dropdown dropdown-end text-black lg:border-r-2 border-[#bbb] pr-3">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full border-2 border-[#bbb]">
                                        <img
                                            alt={userData?.name || "image"}
                                            src={user?.photoURL || "https://i.ibb.co/WcTWxsN/nav-img.png"} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52 p-2 shadow ">
                                    {
                                        userRole === "Admin" && <li><Link to={'/dashboard'} className='text-[15px]'>Dashboard</Link></li>
                                    }
                                    {
                                        userRole === "User" && (
                                            <>
                                                <li>
                                                    <Link to={'/profile'} className="justify-between text-[15px]">
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/orders'} className="justify-between text-[15px]">
                                                        Orders
                                                    </Link>
                                                </li>
                                            </>


                                        )
                                    }
                                    <li><a className='text-[15px]'>Settings</a></li>
                                    <li onClick={handleLogOut}><p className='text-[15px]'>Logout</p></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to={"/login"}>
                                <div className="flex items-center gap-2 lg:px-10 cursor-pointer lg:border-r-2 border-[#bbb]">
                                    <FaRegUser className="lg:text-3xl text-[25px]" />
                                    <div className="hidden lg:flex flex-col">
                                        <h3>{t('account.accountName')}</h3>
                                        <p>{t('account.loginName')}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                    <div className="relative cursor-pointer">
                        <GrFavorite className="lg:text-3xl text-[25px]" />
                        <div className="absolute -top-3 -right-4 rounded-full lg:w-7 lg:h-7 w-5 h-5 bg-[#3BB77E] flex justify-center items-center text-white">
                            0
                        </div>
                    </div>
                    <Link to={"/checkout"}>
                        <div className="flex justify-between items-center lg:gap-5 gap-2 cursor-pointer">
                            <div className="relative">
                                <FiShoppingCart className="lg:text-3xl text-[25px]" />
                                <div className="absolute -top-3 -right-4 rounded-full lg:w-7 lg:h-7 w-5 h-5 bg-[#3BB77E] flex justify-center items-center text-white">
                                    {totalUniqueItems}
                                </div>
                            </div>
                            <div className="lg:flex justify-between flex-col hidden ">
                                <h3>{t('cart.myCart')}</h3>
                                <p>$0.00</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className=" hidden lg:flex items-center justify-between">
                <ul className="flex items-center-center gap-5 text-[18px]">
                    {
                        routeInfo.map(routeLink => (
                            <li className={`${routeLink.route === pathname && "active"} animate`} key={routeLink.id}>
                                <Link to={routeLink.route}>{routeLink.name}</Link>
                            </li>
                        ))
                    }
                </ul>
                <div>
                    <select onChange={(e) => handleLanguageSelect(e.target.value)} className="border ">
                        {
                            lang.map(lan => (
                                <option key={lan.id} selected={lanSelect} className="text-black" value={lan.value}>{lan.name}</option>
                            ))
                        }

                    </select>
                </div>
            </div>
            {/* Response */}

            {/* responsive search input */}
            <div className="pb-2">
                <div className="lg:hidden relative w-full flex items-center">
                    <input className="w-full bg-white text-black focus:outline-0 px-5 py-3 rounded-full border border-[#bbb]" placeholder="Search" type="text" />
                    <div className="absolute top-0 right-0 bg-[#3BB77E] h-full w-10 rounded-r-full flex justify-center items-center cursor-pointer">
                        <IoIosSearch className="text-3xl text-white" />
                    </div>
                </div>
            </div>
            {/* responsive menu and language bar */}
            <div className="lg:hidden flex justify-between items-center py-5">
                <div onClick={handleNavToggle} className="flex space-x-2">
                    <FaBars className="text-[25px]" />
                    <p className="uppercase font-bold">Menu</p>
                </div>
                <select onChange={(e) => changeLanguage(e.target.value)} className="border p-1">
                    {
                        lang.map(lan => (
                            <option key={lan.id} selected={lanSelect} className="text-black" value={lan.value}>{lan.name}</option>
                        ))
                    }

                </select>
            </div>
            <div className={`${!toggle && "hidden duration-300"} z-30 w-80 min-h-screen  absolute left-0 top-0  text-black bg-white    lg:hidden flex-col items-center justify-between py-5`}>
                <div className="flex justify-between items-center  border-b-1 border-[#bbb] pb-2 px-3">
                    <p className="font-bold text-[#524c4c]">Menu</p>
                    <IoMdClose onClick={handleNavToggle} className="text-3xl text-[#524c4c]" />
                </div>
                <ul className="flex-col items-center-center gap-5 space-y-2  text-[18px] px-3 py-5">
                    {
                        routeInfo.map(routeLink => (
                            <li className={`${routeLink.route === pathname && "border-b-2"}`} key={routeLink.id}>
                                <Link to={routeLink.route}>{routeLink.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    );
};

export default Navbar;