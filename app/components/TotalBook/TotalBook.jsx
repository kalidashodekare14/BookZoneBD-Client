import { useEffect } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { useState } from 'react';
import './TotalBook.css'
import { FaBarsStaggered } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import InputRange from 'react-input-range';
import { useCart } from 'react-use-cart';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { totalPublicBook } from '../../Redux/slice/publicTotalBooks'
import { OrbitProgress } from 'react-loading-indicators';


const totalBook = [
    {
        "id": 1,
        "image": "https://i.ibb.co/gMg3m1Zw/potherpachali.png",
        "title": "পথের পাঁচালী",
        "author": "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
        "rating": 5,
        "price": 2000,
        "discount": 25,
        "publisher": "আনন্দ পাবলিশার্স"
    },
    {
        "id": 2,
        "image": "https://i.ibb.co/BH9jWVcF/image.png",
        "title": "দেবদাস",
        "author": "শরৎচন্দ্র চট্টোপাধ্যায়",
        "rating": 5,
        "price": 1500,
        "discount": 30,
        "publisher": "মৌসুমি প্রকাশনী"
    },
    {
        "id": 3,
        "image": "https://i.ibb.co/VYHprhzN/image.png",
        "title": "ফেলুদা সমগ্র",
        "author": "সত্যজিৎ রায়",
        "rating": 5,
        "price": 1800,
        "discount": 20,
        "publisher": "পেঙ্গুইন বুকস"
    },
    {
        "id": 4,
        "image": "https://i.ibb.co/WNP3HVTS/image.png",
        "title": "হুমায়ূন আহমেদের সেরা উপন্যাস",
        "author": "হুমায়ূন আহমেদ",
        "rating": 5,
        "price": 2500,
        "discount": 35,
        "publisher": "অন্যপ্রকাশ"
    },
    {
        "id": 5,
        "image": "https://i.ibb.co/PsPVwLFk/image.png",
        "title": "প্রাচীন বাংলা সাহিত্য",
        "author": "ড. মুহম্মদ এনামুল হক",
        "rating": 4,
        "price": 2000,
        "discount": 40,
        "publisher": "বাংলা একাডেমি"
    },
    {
        "id": 6,
        "image": "https://i.ibb.co/VYHprhzN/image.png",
        "title": "ফেলুদা সমগ্র",
        "author": "সত্যজিৎ রায়",
        "rating": 5,
        "price": 1900,
        "discount": 20,
        "publisher": "পেঙ্গুইন বুকস"
    },
    {
        "id": 7,
        "image": "https://i.ibb.co/0jQHJ58k/image.png",
        "title": "রবীন্দ্র রচনাবলী",
        "author": "রবীন্দ্রনাথ ঠাকুর",
        "rating": 5,
        "price": 1900,
        "discount": 20,
        "publisher": "বিশ্বভারতী"
    },
    {
        "id": 8,
        "image": "https://i.ibb.co/Z6frB18p/image.png",
        "title": "অচিন পাখি",
        "author": "হুমায়ূন আহমেদ",
        "rating": 5,
        "price": 1500,
        "discount": 15,
        "publisher": "অন্যপ্রকাশ"
    },
    {
        "id": 9,
        "image": "https://i.ibb.co/PZfFjpKq/image.png",
        "title": "তিতাস একটি নদীর নাম",
        "author": "অদ্বৈত মল্লবর্মণ",
        "rating": 5,
        "price": 2500,
        "discount": 10,
        "publisher": "রোদের বই"
    },
    {
        "id": 10,
        "image": "https://i.ibb.co/FQzx9zY/image.png",
        "title": "প্যারাডক্সিকাল সাজিদ",
        "author": "আরিফ আজাদ",
        "rating": 5,
        "price": 2800,
        "discount": 25,
        "publisher": "প্যারাডক্স পাবলিকেশন"
    },
    {
        "id": 11,
        "image": "https://i.ibb.co/Mxw5GTsZ/image.png",
        "title": "দুই দুয়ারি",
        "author": "সেলিনা হোসেন",
        "rating": 4,
        "price": 2500,
        "discount": 18,
        "publisher": "সাহিত্য প্রকাশ"
    },
    {
        "id": 12,
        "image": "https://i.ibb.co/Mxw5GTsZ/image.png",
        "title": "আমার বন্ধু রাশেদ",
        "author": "জাফর ইকবাল",
        "rating": 5,
        "price": 3000,
        "discount": 30,
        "publisher": "শিশু প্রকাশ"
    },
    {
        "id": 15,
        "image": "https://i.ibb.co/4w2HZnhX/image.png",
        "title": "শেষের কবিতা",
        "author": "রবীন্দ্রনাথ ঠাকুর",
        "rating": 5,
        "price": 2000,
        "discount": 20,
        "publisher": "বিশ্বভারতী"
    },
    {
        "id": 16,
        "image": "https://i.ibb.co/sdvsTKyy/image.png",
        "title": "বাংলা ১ম পত্র - ক্লাস ৫",
        "author": "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক",
        "rating": 4,
        "price": 180,
        "discount": 10,
        "publisher": "এনসিটিবি"
    },
    {
        "id": 17,
        "image": "https://i.ibb.co/xqRYkCkn/image.png",
        "title": "গণিত - ক্লাস ৮",
        "author": "এনসিটিবি",
        "rating": 5,
        "price": 200,
        "discount": 15,
        "publisher": "এনসিটিবি"
    },
    {
        "id": 18,
        "image": "https://i.ibb.co/B5FnVZkm/1735721362.webp",
        "title": "বিশ্ববিদ্যালয় ভর্তি গাইড",
        "author": "শিক্ষা একাডেমি",
        "rating": 5,
        "price": 450,
        "discount": 20,
        "publisher": "শিক্ষা একাডেমি"
    },
    {
        "id": 20,
        "image": "https://i.ibb.co/wNywPdCC/image.png",
        "title": "সাধারণ জ্ঞান (BCS গাইড)",
        "author": "সুমন সাহা",
        "rating": 5,
        "price": 380,
        "discount": 18,
        "publisher": "BCS একাডেমি"
    },
    {
        "id": 20,
        "image": "https://i.ibb.co/xq1vggjR/61i-w-S0-LX0-L-SY342.jpg",
        "title": "Programming in C",
        "author": "ড. জাহাঙ্গীর হোসেন",
        "rating": 5,
        "price": 550,
        "discount": 15,
        "publisher": "কম্পিউটার বুক হাউস"
    },
    {
        "id": 21,
        "image": "https://i.ibb.co/B2wHCMFp/viber-image-2022-12-26-14-04-10-447.jpg",
        "title": "Applied Statistics",
        "author": "সাদিক হাসান",
        "rating": 5,
        "price": 580,
        "discount": 12,
        "publisher": "স্ট্যাট প্রকাশনী"
    },
    {
        "id": 22,
        "image": "https://i.ibb.co/8DKjCCTq/image.png",
        "title": "বিজ্ঞান - ক্লাস ৯",
        "author": "এনসিটিবি",
        "rating": 4,
        "price": 220,
        "discount": 12,
        "publisher": "এনসিটিবি"
    }
];


const TotalBook = () => {

    const [toggle, setToggle] = useState(false);
    const [ratingFilter, setRatingFilter] = useState(null);
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: 10000 });
    const [discountFilter, setdiscountFilter] = useState({ min: 0, max: 100 });
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState([]);
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const searchInput = queryParams.get('search');
    const { addItem, items } = useCart();
    const { totalBook, loading, error } = useSelector((state) => state.totalBooks);
    const dispatch = useDispatch();


    const handleToggele = () => {
        setToggle(!toggle)
    }


    useEffect(() => {
        dispatch(totalPublicBook());
    }, [])

    const handleAuthorCheckBox = (author) => {
        if (selectedAuthors.includes(author)) {
            setSelectedAuthors(selectedAuthors.filter(item => item !== author));
        } else {
            setSelectedAuthors([...selectedAuthors, author]);
        }
    }

    const handlePublisherCheckBox = (publisher) => {
        if (selectedPublisher.includes(publisher)) {
            setSelectedPublisher(selectedPublisher.filter(item => item !== publisher));
        } else {
            setSelectedPublisher([...selectedPublisher, publisher]);
        }
    }


    const categoryFiltering = totalBook.filter((product) => {

        const matchedSearchInput = searchInput ? (
            product.title.toLowerCase().includes(searchInput.toLowerCase())

        ) : true


        const discountPrice = product.price * product.discount / 100
        const matchedPriceRange = discountPrice >= priceFilter.min && discountPrice <= priceFilter.max
        const matchedDiscountRange = product.discount >= discountFilter.min && product.discount <= discountFilter.max
        // rating filtering
        const matchedRating = ratingFilter ? product.rating >= ratingFilter : true;
        // author filtering
        const mathcedAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(product.author);
        // publisher filtering
        const mathcedPublisher = selectedPublisher.length === 0 || selectedPublisher.includes(product.publisher);
        return (
            matchedSearchInput && matchedPriceRange && matchedDiscountRange && mathcedAuthor && matchedRating && mathcedPublisher
        )

    })


    if (loading) {
        return <div className='h-[550px] flex flex-col justify-center items-center'>
            <OrbitProgress variant="spokes" color="#003a5a" size="large" text="" textColor="" />
            <p className='text-xl'>Please wait...</p>
        </div>
    }


    return (
        <div className='lg:mx-5 my-5 font-mixed'>
            <div className=' flex items-center justify-between my-5'>
                <div className='flex items-center gap-3'>
                    {
                        toggle ? <IoMdClose className='lg:hidden text-xl' onClick={handleToggele} /> : <FaBarsStaggered className='lg:hidden' onClick={handleToggele} />
                    }
                    <p className='font-semibold'>Total items {totalBook.length}</p>
                </div>
                <select defaultValue="Pick a color" className="select w-32 focus:outline-0">
                    <option >All</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </select>
            </div>
            <div className='relative flex justify-between gap-5'>

                {toggle && (
                    <div className="absolute  inset-0 w-full bg-[#00000052] bg-opacity-30 z-30 pointer-events-none"></div>
                )}

                {/* filtering layout */}
                <div className={`${toggle ? "translate-x-0 left-0 duration-300" : "-translate-x-full duration-300"}  px-5 lg:mx-0 absolute -left-10 lg:translate-x-0  lg:static z-30  bg-white w-[85%] p-5 pl-0 pt-0 lg:w-96 lg:h-screen space-y-3`}>
                    <div className='filter-shadaw pt-2 pb-2 rounded-xl'>
                        <div className='border-b'>
                            <p className='text-xl py-4 pl-2 border-[#bbb] font-semibold'>Shop by Price</p>
                        </div>
                        <div className='px-5 py-3'>
                            <InputRange
                                maxValue={10000}
                                minValue={0}
                                value={priceFilter}
                                onChange={setPriceFilter} />
                            <div className='flex items-center justify-between'>
                                <p>৳{priceFilter.min}</p>
                                <p>৳{priceFilter.max}</p>
                            </div>
                        </div>

                    </div>
                    <div className='filter-shadaw pt-2 pb-2 rounded-xl'>
                        <div className='border-b'>
                            <p className='text-xl py-4 pl-2 border-[#bbb] font-semibold'>Shop by Discount</p>
                        </div>
                        <div className='px-5 py-3'>
                            <InputRange
                                maxValue={100}
                                minValue={0}
                                value={discountFilter}
                                onChange={setdiscountFilter} />
                            <div className='flex items-center justify-between'>
                                <p>{discountFilter.min}%</p>
                                <p>{discountFilter.max}%</p>
                            </div>
                        </div>

                    </div>
                    <div className='filter-shadaw rounded-xl'>
                        <p className=' px-3 py-3 font-semibold text-xl'>Filters</p>
                        <div>
                            <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border-b">
                                <input type="checkbox" className="peer" />
                                <div className="collapse-title font-semibold">Author</div>
                                <div className="overflow-auto max-h-72 px-3">
                                    {
                                        [...new Set(totalBook.map(book => book.author))].map((author, index) => (
                                            <div className='flex items-center gap-2 text-[16px]'>
                                                <input
                                                    className=''
                                                    checked={selectedAuthors.includes(author)}
                                                    onChange={() => handleAuthorCheckBox(author)}
                                                    type="checkbox" />
                                                <p>{author}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border-b">
                                <input type="checkbox" className="peer" />
                                <div className="collapse-title font-semibold">Publisher</div>
                                <div className="overflow-auto max-h-72 px-3">
                                    {
                                        [...new Set(totalBook.map(book => book.publisher))].map((publisher, index) => (
                                            <div className='flex items-center gap-2 text-[16px]'>
                                                <input
                                                    className=''
                                                    checked={selectedPublisher.includes(publisher)}
                                                    onChange={() => handlePublisherCheckBox(publisher)}
                                                    type="checkbox" />
                                                <p>{publisher}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300">
                                <input type="checkbox" className="peer" />
                                <div className="collapse-title font-semibold">Rating</div>
                                <div className="overflow-auto max-h-72 px-3">
                                    <Rating
                                        className='py-3'
                                        style={{ maxWidth: 120 }}
                                        value={ratingFilter}
                                        onChange={setRatingFilter}
                                        isRequired
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* all data */}
                <div className='relative mx-5 lg:mx-0  grid grid-cols-1 z-20  md:grid-cols-3 lg:grid-cols-4 gap-5 w-full'>
                    {
                        categoryFiltering.map(book => (
                            <div key={book._id} className=' border-2 border-[#bbb] hover:border-2 hover:border-[#003A5A] hover:duration-200 flex flex-col justify-center p-2'>
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
                                    <button onClick={() => addItem({ ...book, id: book.id })} className='btn w-full bg-[#003A5A] text-white'>Add to cart</button>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
};

export default TotalBook;