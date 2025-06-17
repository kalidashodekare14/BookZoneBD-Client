import React from 'react';
import { useParams } from 'react-router';
import './ViewDetailsPage.css'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const ViewDetailsPage = () => {

    const params = useParams()
    console.log(params)

    const allBookData = [
        {
            "image": "https://i.ibb.co/gMg3m1Zw/potherpachali.png",
            "title": "পথের পাঁচালী",
            "author": {
                "name": "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
                "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSuFnh8mh6WfiAXU0jGmRiP6EXFQK5PefgnEiQIFNLtsMKGfXby9-mC7zefO-w8aTjLLzQdprFK7byzNd-SWuNbA"
            },
            "rating": 4.8,
            "price": 2000,
            "discount": 25
        },
        {
            "image": "https://i.ibb.co/BH9jWVcF/image.png",
            "title": "দেবদাস",
            "author": "শরৎচন্দ্র চট্টোপাধ্যায়",
            "rating": 4.5,
            "price": 1500,
            "discount": 30
        },
        {
            "image": "https://i.ibb.co/VYHprhzN/image.png",
            "title": "ফেলুদা সমগ্র",
            "author": "সত্যজিৎ রায়",
            "rating": 4.9,
            "price": 1800,
            "discount": 20
        },
        {
            "image": "https://i.ibb.co/WNP3HVTS/image.png",
            "title": "হুমায়ূন আহমেদের সেরা উপন্যাস",
            "author": "হুমায়ূন আহমেদ",
            "rating": 4.7,
            "price": 2500,
            "discount": 35
        },
        {
            "image": "https://i.ibb.co/PsPVwLFk/image.png",
            "title": "প্রাচীন বাংলা সাহিত্য",
            "author": "ড. মুহম্মদ এনামুল হক",
            "rating": 4.3,
            "price": 2000,
            "discount": 40
        },
        {
            "image": "https://i.ibb.co/VYHprhzN/image.png",
            "title": "ফেলুদা সমগ্র",
            "author": "সত্যজিৎ রায়",
            "rating": 4.9,
            "price": 1900,
            "discount": 20
        },
        {
            "image": "https://i.ibb.co/0jQHJ58k/image.png",
            "title": "রবীন্দ্র রচনাবলী",
            "author": "রবীন্দ্রনাথ ঠাকুর",
            "rating": 5.00,
            "price": 1900,
            "discount": 20
        },
        {
            "image": "https://i.ibb.co/Z6frB18p/image.png",
            "title": "অচিন পাখি",
            "author": "হুমায়ূন আহমেদ",
            "rating": 4.8,
            "price": 1500,
            "discount": 15
        },
        {
            "image": "https://i.ibb.co/PZfFjpKq/image.png",
            "title": "তিতাস একটি নদীর নাম",
            "author": "অদ্বৈত মল্লবর্মণ",
            "rating": 4.6,
            "price": 2500,
            "discount": 10
        },
        {
            "image": "https://i.ibb.co/FQzx9zY/image.png",
            "title": "প্যারাডক্সিকাল সাজিদ",
            "author": "আরিফ আজাদ",
            "rating": 4.7,
            "price": 2800,
            "discount": 25
        },
        {
            "image": "https://i.ibb.co/Mxw5GTsZ/image.png",
            "title": "দুই দুয়ারি",
            "author": "সেলিনা হোসেন",
            "rating": 4.3,
            "price": 2500,
            "discount": 18
        },
        {
            "image": "https://i.ibb.co/Mxw5GTsZ/image.png",
            "title": "আমার বন্ধু রাশেদ",
            "author": "জাফর ইকবাল",
            "rating": 4.9,
            "price": 3000,
            "discount": 30
        },
        {
            "image": "https://i.ibb.co/4w2HZnhX/image.png",
            "title": "শেষের কবিতা",
            "author": "রবীন্দ্রনাথ ঠাকুর",
            "rating": 4.8,
            "price": 2000,
            "discount": 20
        },
        {
            "image": "https://i.ibb.co/sdvsTKyy/image.png",
            "title": "বাংলা ১ম পত্র - ক্লাস ৫",
            "author": "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক",
            "rating": 4.5,
            "price": 180,
            "discount": 10
        },
        {
            "image": "https://i.ibb.co/xqRYkCkn/image.png",
            "title": "গণিত - ক্লাস ৮",
            "author": "এনসিটিবি",
            "rating": 4.6,
            "price": 200,
            "discount": 15
        },
        {
            "image": "https://i.ibb.co/B5FnVZkm/1735721362.webp",
            "title": "বিশ্ববিদ্যালয় ভর্তি গাইড",
            "author": "শিক্ষা একাডেমি",
            "rating": 4.7,
            "price": 450,
            "discount": 20
        },
        {
            "image": "https://i.ibb.co/wNywPdCC/image.png",
            "title": "সাধারণ জ্ঞান (BCS গাইড)",
            "author": "সুমন সাহা",
            "rating": 4.6,
            "price": 380,
            "discount": 18
        },
        {
            "image": "https://i.ibb.co/xq1vggjR/61i-w-S0-LX0-L-SY342.jpg",
            "title": "Programming in C",
            "author": "ড. জাহাঙ্গীর হোসেন",
            "rating": 4.6,
            "price": 550,
            "discount": 15
        },
        {
            "image": "https://i.ibb.co/B2wHCMFp/viber-image-2022-12-26-14-04-10-447.jpg",
            "title": "Applied Statistics",
            "author": "সাদিক হাসান",
            "rating": 4.7,
            "price": 580,
            "discount": 12
        },
        {
            "image": "https://i.ibb.co/8DKjCCTq/image.png",
            "title": "বিজ্ঞান - ক্লাস ৯",
            "author": "এনসিটিবি",
            "rating": 4.4,
            "price": 220,
            "discount": 12
        }
    ]


    return (
        <div className='mx-20 my-5 font-mixed'>
            <div className='flex gap-5'>
                <div className='cursor-pointer book-shadaw w-72 h-96 overflow-hidden bg-[#bbbbbb6b] border-black '>
                    <img className='w-full h-96 hover:w-68 hover:duration-300 ' src={allBookData[3].image} alt="" />
                </div>
                <div className='space-y-3 w-[40%]'>
                    <h1 className='text-xl'>পথের পাঁচালী</h1>
                    <div className='flex items-center gap-2'>
                        <img className='w-16 h-16 rounded-full border p-2' src={"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSuFnh8mh6WfiAXU0jGmRiP6EXFQK5PefgnEiQIFNLtsMKGfXby9-mC7zefO-w8aTjLLzQdprFK7byzNd-SWuNbA"} alt="" />
                        <p>বিভূতিভূষণ বন্দ্যোপাধ্যায়</p>
                    </div>
                    <Rating
                        style={{ maxWidth: 100 }}
                        value={3}
                        readOnly
                    />
                    <p>বাংলার গ্রামে দুই ভাইবোন অপু আর দুর্গার বেড়ে ওঠা নিয়েই বিখ্যাত এই উপন্যাস। এই উপন্যাসের ছোটোদের জন্য সংস্করণটির নাম আম আঁটির ভেঁপু। পরবর্তীকালে বিখ্যাত বাঙালি চলচ্চিত্র পরিচালক সত্যজিৎ রায় এই উপন্যাসটি অবলম্বনে পথের পাঁচালী (চলচ্চিত্র) নির্মাণ করেন যা পৃথিবী-বিখ্যাত হয়।</p>
                    <div className="">
                        <table className=" text-left w-60">
                            <tr>
                                <td className='font-semibold'>Publisher</td>
                                <td>অনুপম প্রকাশনী</td>
                            </tr>
                            <tr>
                                <td className='font-semibold'>Language</td>
                                <td>বাংলা</td>
                            </tr>
                            <tr>
                                <td className='font-semibold'>Page</td>
                                <td>5487</td>
                            </tr>
                        </table>
                    </div>
                    <p className='space-x-3 text-xl'>
                        <del>৳{allBookData[0].price}</del>
                        <span>৳{allBookData[0].price * allBookData[0].discount / 100}</span>
                    </p>
                    <div className='space-x-3'>
                        <button className='btn w-52 bg-[#003A5A] text-white'>Add to Cart</button>
                        <button className='btn w-52  bg-opacity-0 border bg-opacity-0 border-[#003A5A]'>Preview</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsPage;