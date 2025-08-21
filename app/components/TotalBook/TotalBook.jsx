import { useEffect } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { useState } from 'react';
import './TotalBook.css'
import { FaBarsStaggered } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import InputRange from 'react-input-range';
import { useCart } from 'react-use-cart';
import { Link, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { totalPublicBook } from '../../Redux/slice/publicDataSlice/publicTotalBooks'
import ReactPaginate from 'react-paginate';
import 'react-loading-skeleton/dist/skeleton.css'


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
    const { allBooks, filteringData, loading, totalPages, error } = useSelector((state) => state.publicAllBooks);
    const dispatch = useDispatch();
    const cardLoading = 10
    // // pagination
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10


    console.log('checking all data', allBooks)

    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
    }


    const handleToggele = () => {
        setToggle(!toggle)
    }


    useEffect(() => {
        const params = new URLSearchParams({
            search: searchInput || "",
            minPrice: priceFilter.min,
            maxPrice: priceFilter.max,
            minDiscount: discountFilter.min,
            maxDiscount: discountFilter.max,
            rating: ratingFilter || "",
            authors: selectedAuthors.join(','),
            publishers: selectedPublisher.join(','),
            page: currentPage + 1,
            limit: limit
        })
        dispatch(totalPublicBook({ params: params.toString() }));
    }, [searchInput, priceFilter, discountFilter, ratingFilter, selectedAuthors, selectedPublisher, currentPage, limit])


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




    return (
        <div className='lg:mx-5 my-5 font-mixed relative'>
            <div className=' flex items-center justify-between my-5 mx-5'>
                <div className='flex items-center gap-3'>
                    {
                        toggle ? <IoMdClose className='lg:hidden text-xl' onClick={handleToggele} /> : <FaBarsStaggered className='lg:hidden' onClick={handleToggele} />
                    }
                    <p className='font-semibold'>Total items {allBooks.length}</p>
                </div>
                <select defaultValue="Pick a color" className="select w-32 focus:outline-0">
                    <option >All</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </select>
            </div>
            <div className='relative flex gap-5'>

                {toggle && (
                    <div className="absolute  inset-0 w-full bg-[#00000052] bg-opacity-30 z-30 pointer-events-none"></div>
                )}

                {/* filtering layout */}
                <div className={`${toggle ? "translate-x-0 left-0 duration-300" : "-translate-x-full duration-300"}  px-5 lg:mx-0 absolute -left-10 lg:translate-x-0  lg:static z-30  bg-white w-[85%] p-5 pl-0 pt-0 lg:w-96  space-y-3`}>
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
                                        filteringData.length !== 0 ? (
                                            [...new Set(filteringData?.map(book => book.author.author_name))].map((author, index) => (
                                                <div className='flex items-center gap-2 text-[16px]'>
                                                    <input
                                                        className=''
                                                        checked={selectedAuthors.includes(author)}
                                                        onChange={() => handleAuthorCheckBox(author)}
                                                        type="checkbox" />
                                                    <p>{author}</p>
                                                </div>
                                            )

                                            )
                                        ) : (
                                            <p>No Data</p>
                                        )
                                    }
                                </div>
                            </div>
                            <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border-b">
                                <input type="checkbox" className="peer" />
                                <div className="collapse-title font-semibold">Publisher</div>
                                <div className="overflow-auto max-h-72 px-3">
                                    {
                                        filteringData.length !== 0 ? (
                                            [...new Set(filteringData?.map(book => book.publisher))].map((publisher, index) => (
                                                <div className='flex items-center gap-2 text-[16px]'>
                                                    <input
                                                        className=''
                                                        checked={selectedPublisher.includes(publisher)}
                                                        onChange={() => handlePublisherCheckBox(publisher)}
                                                        type="checkbox" />
                                                    <p>{publisher}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No Data</p>
                                        )
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
                <div className='w-full'>
                    {allBooks.length > 0 ? (
                        <div className='relative mx-5 lg:mx-0  grid grid-cols-1 z-20  md:grid-cols-3 lg:grid-cols-4 gap-5 w-full'>
                            {
                                allBooks.map(book => (
                                    <Link to={`/book/${book._id}`}>
                                        <div key={book._id} className='border-2 border-[#bbb] hover:border-2 hover:border-[#003A5A] hover:duration-200 flex flex-col justify-center p-2'>
                                            <img className='w-full h-60 px-5' src={book.image} alt="" />
                                            <div className='mt-3 space-y-2'>
                                                <h1 className='font-semibold'>{book.title}</h1>
                                                <p>{book?.author?.author_name}</p>
                                                <Rating
                                                    style={{ maxWidth: 100 }}
                                                    value={book.rating}
                                                    readOnly
                                                />
                                                <div className='flex justify-between items-center'>
                                                    <p>৳{book.price * book.discount / 100}</p>
                                                    <p><del>৳{book.price}</del></p>
                                                </div>
                                                {/* <div className=''>
                                            <Link >
                                                <button className='btn w-full bg-[#003A5A] text-white'>View Details</button>
                                            </Link>
                                            <button onClick={() => addItem({ ...book, id: book._id })} className='btn bg-[#003A5A] text-white'>Add to cart</button>
                                        </div> */}
                                            </div>

                                        </div>
                                    </Link>

                                ))
                            }
                        </div>
                    ) : (
                        <div>
                            {
                                loading && (
                                    <div className='w-full grid grid-cols-1 lg:grid-cols-4'>
                                        {[...Array(cardLoading)].map((_, index) => (
                                            <div className='border border-[#bbb] w-60 p-5'>
                                                <div className="flex w-52 flex-col gap-4">
                                                    <div className="skeleton h-52 w-full"></div>
                                                    <div className="skeleton h-4 w-40"></div>
                                                    <div className="skeleton h-4 w-32"></div>
                                                    <div className="skeleton h-4 w-40"></div>
                                                    <div className='flex items-center gap-5'>
                                                        <div className="skeleton h-4 w-full"></div>
                                                        <div className="skeleton h-4 w-full"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                            <div>
                                {
                                    !loading && (
                                        <div className='flex flex-col justify-center items-center min-h-screen'>
                                            <img className='w-80' src="https://i.ibb.co.com/GfQ9CjV6/9264885.jpg" alt="" />
                                            <p className='text-xl'>No Data</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    )}
                </div>
            </div>
            <div className='flex justify-center items-center my-10 px-2'>
                {
                    allBooks.length !== 0 ? (
                        <ReactPaginate
                            forcePage={currentPage}
                            previousLabel={'← Previous'}
                            nextLabel={'Next →'}
                            breakLabel={'...'}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={'flex flex-wrap items-center gap-2'}
                            activeClassName={'bg-[#003a5a] text-white'}
                            pageClassName={'px-3 py-2 border cursor-pointer'}
                            previousClassName={'px-3 py-2 border cursor-pointer  hover:bg-[#003a5a] hover:text-white'}
                            nextClassName={'px-3 py-2 border cursor-pointer  hover:bg-[#003a5a] hover:text-white'}
                            breakClassName={'px-3 py-2 border cursor-pointer'}
                        />
                    ) : (
                        <div>

                        </div>
                    )
                }
            </div>
        </div >
    );
};

export default TotalBook;