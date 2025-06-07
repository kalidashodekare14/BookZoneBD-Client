import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLocationDot, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { IoIosSend } from 'react-icons/io';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { MdAddIcCall, MdOutlineMail } from 'react-icons/md';

const Footer = () => {

    const { t } = useTranslation("footer");

    return (
        <div className=''>
            <footer className="footer  font-mixed sm:footer-horizontal bg-[#003A5A] text-white p-10">
                <aside className='w-72 space-y-3'>
                    <h2 className='text-3xl'>BookZoneBD</h2>
                    <p className='text-[15px]'>{t("description")}</p>
                    <div className='flex items-center gap-3'>
                        <div className='cursor-pointer text-[#003A5A] w-7 h-7 bg-white flex justify-center items-center rounded-full'>
                            <FaFacebookF className='text-xl' />
                        </div>
                        <div className='cursor-pointer text-[#003A5A] w-7 h-7 bg-white flex justify-center items-center rounded-full'>
                            <FaInstagram className='text-xl' />
                        </div>
                        <div className='cursor-pointer text-[#003A5A] w-7 h-7 bg-white flex justify-center items-center rounded-full'>
                            <FaYoutube className='text-xl' />
                        </div>
                        <div className='cursor-pointer text-[#003A5A] w-7 h-7 bg-white flex justify-center items-center rounded-full'>
                            <FaXTwitter className='text-xl' />
                        </div>
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">All Book</a>
                    <a className="link link-hover">Subject</a>
                    <a className="link link-hover">Writer</a>
                    <a className="link link-hover">Publisher</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Book Categories</h6>
                    <a className="link link-hover">Fiction</a>
                    <a className="link link-hover">Non-Fiction</a>
                    <a className="link link-hover">Children's Book</a>
                    <a className="link link-hover">Biography</a>
                    <a className="link link-hover">Educational</a>
                    <a className="link link-hover">Sci-Fi</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Newsletter & Contact</h6>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-2'>
                            <div className='cursor-pointer text-[#003A5A] w-7 h-7 bg-white flex justify-center items-center rounded-full'>
                                <IoLocationOutline className='text-xl' />
                            </div>
                            <p>Head Office: Online</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='cursor-pointer text-[#003A5A] w-7 h-7 bg-white flex justify-center items-center rounded-full'>
                                <MdOutlineMail className='text-xl' />
                            </div>
                            <p>bookshopzone@gmail.com</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='cursor-pointer text-[#003A5A] w-7 h-7 bg-white flex justify-center items-center rounded-full'>
                                <IoCallOutline className='text-xl' />
                            </div>
                            <p>+8801754789562</p>
                        </div>
                        <div className='relative flex items-center border-black-2 shadow'>
                            <input className='w-60 p-2 bg-white border-2-black focus:outline-0 rounded-4xl  border-black text-black' placeholder='Subscribe' type="text" />
                            <div className='absolute cursor-pointer right-0 flex justify-center items-center w-10 h-full rounded-r-4xl  text-2xl bg-[#3BB77E]'>
                                <IoIosSend />
                            </div>
                        </div>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;