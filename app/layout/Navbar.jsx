import { useState } from "react";
import { FaBars, FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { Link } from "react-router";

const Navbar = () => {

    const [toggle, setToggle] = useState(false);

    const handleNavToggle = () => {
        setToggle(!toggle)
    }


    return (
        <div className="lg:px-10 px-5 relative bg-[#003A5A] text-white">
            {/*  */}
            <div className="flex items-center justify-between py-5">
                <div className="pr-10">
                    <h1 className="lg:text-3xl text-2xl">BookShopBD</h1>
                </div>
                <div className="hidden relative w-[50%] lg:flex items-center">
                    <input className="w-full bg-white text-black focus:outline-0 px-5 py-3 rounded-full border border-[#bbb]" placeholder="Search" type="text" />
                    <div className="absolute top-0 right-0 bg-[#3BB77E] h-full w-14 rounded-r-full flex justify-center items-center cursor-pointer">
                        <IoIosSearch className="text-3xl text-white" />
                    </div>
                </div>
                <div className="flex items-center justify-between lg:gap-8 gap-5">
                    <div className="flex items-center gap-2 lg:border-r-2 lg:px-10 cursor-pointer">
                        <FaRegUser className="lg:text-3xl text-[25px]" />
                        <div className="hidden lg:flex flex-col">
                            <h3>Account</h3>
                            <p>Log In</p>
                        </div>
                    </div>
                    <div className="relative cursor-pointer">
                        <GrFavorite className="lg:text-3xl text-[25px]" />
                        <div className="absolute -top-3 -right-4 rounded-full lg:w-7 lg:h-7 w-5 h-5 bg-[#3BB77E] flex justify-center items-center text-white">
                            0
                        </div>
                    </div>
                    <div className="flex items-center lg:gap-5 gap-2  cursor-pointer">
                        <div className="relative ">
                            <FiShoppingCart className="lg:text-3xl text-[25px]" />
                            <div className="absolute -top-3 -right-4 rounded-full lg:w-7 lg:h-7 w-5 h-5 bg-[#3BB77E] flex justify-center items-center text-white">
                                0
                            </div>
                        </div>
                        <div className="lg:flex flex-col hidden w-16">
                            <h3>My Cart</h3>
                            <p>$0.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="font-hindSiliguri hidden lg:flex items-center justify-between">
                <ul className="flex items-center-center gap-5 text-[18px]">
                    <li>
                        <Link to={""}>হোম</Link>
                    </li>
                    <li>বই</li>
                    <li>বিষয়</li>
                    <li>লেখক</li>
                    <li>প্রকাশক</li>
                </ul>
                <div>
                    <select className="border ">
                        <option className="text-black" value="">EN</option>
                        <option className="text-black" value="">BN</option>
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
                <select className="border p-1">
                    <option className="text-black" value="">EN</option>
                    <option className="text-black" value="">BN</option>
                </select>
            </div>

            <div className={`${!toggle && "hidden duration-300"} w-80 min-h-screen  absolute left-0 top-0  text-black bg-white   font-hindSiliguri  lg:hidden flex-col items-center justify-between py-5`}>
                <div className="flex justify-between items-center  border-b-1 border-[#bbb] pb-2 px-3">
                    <p className="font-bold text-[#524c4c]">Menu</p>
                    <IoMdClose onClick={handleNavToggle} className="text-3xl text-[#524c4c]" />
                </div>
                <ul className="flex-col items-center-center gap-5 space-y-2  text-[18px] px-3 py-5">
                    <li>
                        <Link to={""}>হোম</Link>
                    </li>
                    <li>বই</li>
                    <li>বিষয়</li>
                    <li>লেখক</li>
                    <li>প্রকাশক</li>
                </ul>
            </div>

        </div>
    );
};

export default Navbar;