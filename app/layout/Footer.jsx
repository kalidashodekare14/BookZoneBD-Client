import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLocationDot } from 'react-icons/fa6';

const Footer = () => {

    const { t } = useTranslation("footer");

    return (
        <div className='font-rubik'>
            <footer className="footer font-hindSiliguri  sm:footer-horizontal bg-[#003A5A] text-white p-10">
                <aside className='w-52'>
                    <h2 className='text-3xl'>BookZoneBD</h2>
                    <p>{t("description")}</p>
                    <div>
                        <div className='flex items-center gap-3'>
                            <div className='w-7 h-7 rounded-full bg-white text-[#003A5A] flex justify-center items-center text-xl'>
                                <FaLocationDot  />
                            </div>
                            <p>Dhaka, Bangladesh</p>
                        </div>
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;