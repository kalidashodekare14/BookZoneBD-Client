import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import './ViewDetailsPage.css'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { publicViewBooks } from '../../Redux/slice/publicDataSlice/viewDetailsBookSlice'
import { reviewCreate, totalReviews } from '../../Redux/slice/publicDataSlice/productReviewSlice';
import { useCart } from 'react-use-cart';
import { OrbitProgress } from 'react-loading-indicators';
import { FaCheckCircle } from 'react-icons/fa';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import useUser from '../../hooks/useUser';
import { ToastContainer, toast } from 'react-toastify';
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


const ViewDetailsPage = () => {

    const floatValues = [4.30, 3.50, 2.20, 1.20]
    const reviewRange = [120, 25, 15, 11]
    const { userData, loading: userLoading, error: userError } = useUser()
    const { bookDetails, loading: bookLoading, error: bookError } = useSelector((state) => state.viewDetailBooks)
    const { reviewsData, loading: reviewLoading, error: reviewError } = useSelector((state) => state.productReviews)
    const [ratingInput, setRatingInput] = useState(null)
    const dispatch = useDispatch();
    const { book_id } = useParams();
    const { addItem, items } = useCart();
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const ratingRef = useRef(null);
    const [rating, setRating] = useState(0);



    useEffect(() => {
        dispatch(totalReviews({ id: bookDetails?._id }))
    }, [userData?._id, dispatch])

    useEffect(() => {
        dispatch(publicViewBooks({ id: book_id }))
    }, [])




    const handleReviewForm = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value

        if (rating < 1) {
            return toast.warning("Please select start");
        } else if (event.target.comment.value.length < 1) {
            return toast.warning("Please write a comment");
        } else if (!userData.name || !userData.image) {
            return toast.warning("Please update your profile");
        }

        try {
            const reviewInfo = {
                user_name: userData?.name,
                user_image: userData?.image,
                product_id: bookDetails?._id,
                rating: rating,
                comment: comment
            }
            dispatch(reviewCreate({ data: reviewInfo }))
            if (reviewLoading === false) {
                onCloseModal()
            }
        } catch (error) {
            console.log('review create problem', error.message);
        }
    }


    if (bookLoading) {
        return <div className='h-[550px] flex flex-col justify-center items-center'>
            <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
            <p className='text-xl'>Please wait...</p>
        </div>
    }


    return (
        <div className='lg:mx-20 mx-5 my-5 font-mixed'>
            <div className='flex flex-col lg:flex-row justify-between gap-5'>
                <div className='cursor-pointer book-shadaw lg:w-80 h-96 overflow-hidden bg-[#bbbbbb6b] border-black '>
                    <img className='w-full h-96 hover:w-74 hover:duration-300 duration-300' src={bookDetails?.image} alt="" />
                </div>
                <div className='space-y-3 lg:w-[40%]'>
                    <h1 className='text-xl'>{bookDetails?.title}</h1>
                    <div className='flex items-center gap-2'>
                        {/* <img className='w-16 h-16 rounded-full border p-2' src={"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSuFnh8mh6WfiAXU0jGmRiP6EXFQK5PefgnEiQIFNLtsMKGfXby9-mC7zefO-w8aTjLLzQdprFK7byzNd-SWuNbA"} alt="" /> */}
                        <p>By: <Link className='border-b' to={`/writer/${bookDetails?._id}`}>{bookDetails?.author?.author_name}</Link></p>
                    </div>
                    <Rating
                        style={{ maxWidth: 100 }}
                        value={bookDetails?.averageRating}
                        readOnly
                    />
                    <p>{bookDetails?.description}</p>
                    <div className="">
                        <table className=" text-left w-70">
                            <tr>
                                <td className='font-semibold'>Category :</td>
                                <td>{bookDetails?.category}</td>
                            </tr>
                            <tr>
                                <td className='font-semibold'>Publisher :</td>
                                <td>{bookDetails?.publisher}</td>
                            </tr>

                            <tr>
                                <td className='font-semibold flex items-center gap-2'>
                                    <span><FaCheckCircle className='text-[#57d500]' /></span>
                                    <span>In Stock :</span>
                                </td>
                                <td>{bookDetails?.stock}+ copies available</td>
                            </tr>
                        </table>
                    </div>
                    <p className='space-x-3 text-xl'>
                        <del>৳{bookDetails?.price}</del>
                        <span>৳{bookDetails?.price * bookDetails?.discount / 100}</span>
                    </p>
                    <div className='space-x-3'>
                        <button onClick={() => addItem({ ...bookDetails, id: bookDetails._id })} className='btn lg:w-52 w-full bg-[#003A5A] text-white'>Add to Cart</button>
                        <button className='btn lg:w-52 w-full  bg-opacity-0 border bg-opacity-0 border-[#003A5A]'>Preview</button>
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
                        <button onClick={onOpenModal} className='btn bg-[#003A5A] text-white'>রিভিউ লিখুন</button>
                    </div>
                    <div>
                        <h1 className='text-3xl'>4.50</h1>
                        <Rating
                            style={{ maxWidth: 90 }}
                            value={bookDetails?.averageRating}
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
                        reviewsData.map(review => (
                            <div key={review.id} className='space-y-3 border-b border-[#bbbbbb8c] pb-3 '>
                                <div className='flex items-center gap-2'>
                                    <img className='w-10 h-10 rounded-full' src={review?.user_image} alt="" />
                                    <div className='space-y-1'>
                                        <p className='space-x-3'>
                                            <span className='font-semibold'>{review?.user_name}</span>
                                            <span>{new Date(review?.createdAt).toLocaleDateString()}</span>
                                        </p>
                                        <Rating
                                            style={{ maxWidth: 80 }}
                                            value={review?.rating}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <p>{review?.comment}</p>
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
            <Modal open={open} onClose={onCloseModal} center>
                <form onSubmit={handleReviewForm} className='lg:w-96'>
                    <h2 className='text-xl pb-2'>Write your review</h2>
                    <div className='flex flex-col justify-center items-center border-t border-b border-[#bbb] p-3'>
                        <p>Please rate this product</p>
                        <Rating
                            style={{ maxWidth: 120 }}
                            value={rating}
                            ref={ratingRef}
                            onChange={setRating}
                            isRequired
                        />
                    </div>
                    <div>
                        <textarea className='textarea w-full h-32 focus:outline-0 my-2' name="comment" id=""></textarea>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className='btn w-32 bg-[#003a5a] text-white'>Submit</button>
                    </div>
                </form>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ViewDetailsPage;