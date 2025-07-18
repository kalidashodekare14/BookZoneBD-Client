import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import './ViewDetailsPage.css'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { publicViewBooks } from '../../Redux/slice/viewDetailsBookSlice'

const ViewDetailsPage = () => {

    const floatValues = [4.30, 3.50, 2.20, 1.20]
    const reviewRange = [120, 25, 15, 11]
    const [ratingInput, setRatingInput] = useState(null)
    const { bookDetails, loading, error } = useSelector((state) => state.viewDetailBooks)
    const dispatch = useDispatch()
    const { book_id } = useParams()

    console.log('checking data', bookDetails)


    useEffect(() => {
        dispatch(publicViewBooks({ id: book_id }))
    }, [])

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

    const reviewData = [
        {
            id: 1,
            name: "Dip Roy",
            reviewText: "বইটা অনেক ভালো আমি পড়েছি",
            rating: 0,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEfVLHWUhPZlg06EslP51HN86z95tdlvBCfg&s",
            date: "2025-06-10"
        },
        {
            id: 2,
            name: "Jui Akter",
            reviewText: "এই বইটা আমাকে অনেক অনুপ্রাণিত করেছে।",
            rating: 4,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGTA3_R57qEqb53kD5xDRi6kCfCQJntwGqA&s",
            date: "2025-06-12"
        },
        {
            id: 3,
            name: "Rafi Hasan",
            reviewText: "ভালো লাগেনি, লেখার স্টাইল একটু দুর্বল ছিল।",
            rating: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnCoKANE7UwhA8ABKR3pFi-PKMgtqAUdHtuA&s",
            date: "2025-06-13"
        },
        {
            id: 4,
            name: "Mim Chowdhury",
            reviewText: "ছবিগুলো অসাধারণ ছিল, ছোটদের জন্য একদম পারফেক্ট।",
            rating: 5,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkFjmoZpOMsbGHmtinZvZOdiJhpAMmGOV-Bg&s",
            date: "2025-06-15"
        },
        {
            id: 5,
            name: "Sabbir Rahman",
            reviewText: "একদম সময়ের অপচয়, কনটেন্ট ভালো না।",
            rating: 1,
            image: "https://i.pinimg.com/originals/9e/e0/ae/9ee0ae4e22cfcaff074e0e5716961dd8.jpg",
            date: "2025-06-16"
        },
        {
            id: 6,
            name: "Nusrat Jahan",
            reviewText: "গল্পের প্লট ভালো ছিল, তবে আরও গভীরতা প্রয়োজন ছিল।",
            rating: 3,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa9QoegeBaHUIHLbm17sqLdbQaKe7vm_F4zQ&s",
            date: "2025-06-14"
        },
        {
            id: 7,
            name: "Tanvir Ahmed",
            reviewText: "এক কথায় অসাধারণ! লেখকের কাজকে সাধুবাদ জানাই।",
            rating: 5,
            image: "https://www.mgi.org/assets/images/team/d3.jpg",
            date: "2025-06-17"
        },
        {
            id: 8,
            name: "Lamia Haque",
            reviewText: "ভালোই ছিল, তবে শেষে কিছুটা দুর্বল মনে হয়েছে।",
            rating: 3,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUgw32e5TJHzaXcI4-6dwv66UWPCRPMisumQ&s",
            date: "2025-06-11"
        },
        {
            id: 9,
            name: "Anik Das",
            reviewText: "বইটি অনেক ইনফরমেটিভ ছিল, নতুন অনেক কিছু শিখলাম।",
            rating: 4,
            image: "https://avatars.githubusercontent.com/u/16396161?v=4",
            date: "2025-06-09"
        },
        {
            id: 10,
            name: "Shimu Khatun",
            reviewText: "ভাষা সহজবোধ্য ছিল, নতুন পাঠকদের জন্য ভালো।",
            rating: 4,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhVcG80PEkE7iYOPa6644rMQHF_OglGye2pQ&s",
            date: "2025-06-08"
        }
    ];



    return (
        <div className='mx-20 my-5 font-mixed'>
            <div className='flex justify-between gap-5'>
                <div className='cursor-pointer book-shadaw w-80 h-96 overflow-hidden bg-[#bbbbbb6b] border-black '>
                    <img className='w-full h-96 hover:w-74 hover:duration-300 duration-300' src={bookDetails?.image} alt="" />
                </div>
                <div className='space-y-3 w-[40%]'>
                    <h1 className='text-xl'>{bookDetails?.title}</h1>
                    <div className='flex items-center gap-2'>
                        <img className='w-16 h-16 rounded-full border p-2' src={"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSuFnh8mh6WfiAXU0jGmRiP6EXFQK5PefgnEiQIFNLtsMKGfXby9-mC7zefO-w8aTjLLzQdprFK7byzNd-SWuNbA"} alt="" />
                        <p>{bookDetails?.author}</p>
                    </div>
                    <Rating
                        style={{ maxWidth: 100 }}
                        value={bookDetails?.rating}
                        readOnly
                    />
                    <p>{bookDetails?.description}</p>
                    <div className="">
                        <table className=" text-left w-60">
                            <tr>
                                <td className='font-semibold'>Publisher</td>
                                <td>{bookDetails?.publisher}</td>
                            </tr>
                            <tr>
                                <td className='font-semibold'>Language</td>
                                <td>বাংলা</td>
                            </tr>
                            <tr>
                                <td className='font-semibold'>Stock</td>
                                <td>{bookDetails?.stock}</td>
                            </tr>
                        </table>
                    </div>
                    <p className='space-x-3 text-xl'>
                        <del>৳{bookDetails?.price}</del>
                        <span>৳{bookDetails?.price * bookDetails?.discount / 100}</span>
                    </p>
                    <div className='space-x-3'>
                        <button className='btn w-52 bg-[#003A5A] text-white'>Add to Cart</button>
                        <button className='btn w-52  bg-opacity-0 border bg-opacity-0 border-[#003A5A]'>Preview</button>
                    </div>
                </div>
                <div className=''>
                    <h1 className='text-xl'>Related Products</h1>
                    <div className='space-y-3 my-3'>
                        {
                            allBookData.slice(1, 5).map(rp => (
                                <div className='flex gap-3 cursor-pointer'>
                                    <img className='w-14 h-20' src={rp.image} alt="" />
                                    <div>
                                        <h1>{rp.title}</h1>
                                        <p>{rp.author}</p>
                                        <Rating
                                            style={{ maxWidth: 80 }}
                                            value={3}
                                            readOnly
                                        />
                                        <p className='space-x-3'>
                                            <del>৳{rp.price}</del>
                                            <span>৳{rp.price * rp.discount / 100}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-semibold'>Reviews and Ratings</h1>
                <div className='flex justify-between items-center my-3'>
                    <div className='space-y-3'>
                        <Rating
                            style={{ maxWidth: 150 }}
                            value={ratingInput}
                            onChange={setRatingInput}
                            isRequired
                        />
                        <button className='btn bg-[#003A5A] text-white'>রিভিউ লিখুন</button>
                    </div>
                    <div>
                        <h1 className='text-3xl'>4.50</h1>
                        <Rating
                            style={{ maxWidth: 90 }}
                            value={3}
                            readOnly
                        />
                    </div>
                    <div className='flex'>
                        <div style={{ maxWidth: 100, width: '100%' }}>
                            {floatValues.map((value) => (
                                <Rating readOnly value={value} key={value} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='space-y-3'>
                    {
                        reviewData.map(review => (
                            <div key={review.id} className='space-y-3 border-b border-[#bbbbbb8c] pb-3 '>
                                <div className='flex items-center gap-2'>
                                    <img className='w-10 h-10 rounded-full' src={review.image} alt="" />
                                    <div className='space-y-1'>
                                        <p className='space-x-3'>
                                            <span className='font-semibold'>{review.name}</span>
                                            <span>{review.date}</span>
                                        </p>
                                        <Rating
                                            style={{ maxWidth: 80 }}
                                            value={3}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <p>{review.reviewText}</p>
                                <div className='flex  items-center gap-3'>
                                    <button className='btn '>
                                        <AiOutlineLike className='text-xl' />
                                        <span>0</span>
                                    </button>
                                    <button className='btn'>
                                        <AiOutlineDislike className='text-xl' />
                                        <span>0</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsPage;