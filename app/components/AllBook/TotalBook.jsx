
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { useState } from 'react';



const TotalBook = () => {


    const allBookData = [
        {
            "image": "https://i.ibb.co/gMg3m1Zw/potherpachali.png",
            "title": "পথের পাঁচালী",
            "author": "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
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
        <div className='mx-5 my-5'>
            <div className='flex items-center justify-between my-5'>
                <p>Total items 100</p>
                <select defaultValue="Pick a color" className="select w-32 focus:outline-0">
                    <option >All</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </select>
            </div>
            <div className='flex justify-between gap-5'>
                {/* filtering layout */}
                <div className='w-96 h-screen'>
                    <div className='shadow-xl/50 p-5'>
                        <p className='my-5'>Shop by Price</p>
                        {/* <div className='flex items-center justify-between font-semibold'>
                            <p>৳0</p>
                            <p>৳20000</p>
                        </div> */}
                    </div>
                </div>
                {/* all data */}
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full'>
                    {
                        allBookData.map(book => (
                            <div className=' border-2 border-[#bbb] hover:border-2 hover:border-[#003A5A] hover:duration-200 flex flex-col justify-center p-2'>
                                <img className='w-full h-60 px-5' src={book.image} alt="" />
                                <div className='mt-3 space-y-2'>
                                    <h1 className='font-semibold'>{book.title}</h1>
                                    <p>{book.author}</p>
                                    <Rating
                                        style={{ maxWidth: 100 }}
                                        value={book.rating}
                                        readOnly
                                    />
                                    <div className='flex justify-between items-center'>
                                        <p>৳{book.price * book.discount / 100}</p>
                                        <p><del>৳{book.price}</del></p>
                                    </div>
                                    <button className='btn w-full bg-[#003A5A] text-white'>Add to cart</button>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default TotalBook;