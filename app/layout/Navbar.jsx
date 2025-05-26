import { FaBars, FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
    return (
        <div className="lg:px-10 px-5 bg-[#003A5A] text-white">
            {/*  */}
            <div className="flex items-center justify-between py-5">
                <div className="pr-10">
                    <h1 className="lg:text-3xl text-2xl">BookShopBD</h1>
                </div>
                <div className="hidden relative w-full lg:flex items-center">
                    <input className="w-full bg-white text-black focus:outline-0 px-5 py-3 rounded-full border border-[#bbb]" placeholder="Search" type="text" />
                    <div className="absolute top-0 right-0 bg-[#3BB77E] h-full w-10 rounded-r-2xl flex justify-center items-center cursor-pointer">
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
                    <div className="lg:hidden flex">
                        <FaBars className="text-[25px]" />
                    </div>
                </div>
            </div>
            <div className="pb-2">
                <div className="lg:hidden relative w-full flex items-center">
                    <input className="w-full bg-white text-black focus:outline-0 px-5 py-3 rounded-full border border-[#bbb]" placeholder="Search" type="text" />
                    <div className="absolute top-0 right-0 bg-[#3BB77E] h-full w-10 rounded-r-2xl flex justify-center items-center cursor-pointer">
                        <IoIosSearch className="text-3xl text-white" />
                    </div>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Navbar;