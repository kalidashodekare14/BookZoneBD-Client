import React from 'react';

const AddBook = () => {
    return (
        <div className=' font-mixed'>
            <div className='flex p-3 gap-5'>
                <div className='w-full space-y-3'>
                    <div className='bg-[#e4e4e4] p-3 rounded-xl'>
                        <h1 className='text-xl my-2'>General Information</h1>
                        <div className='w-full'>
                            <p>Book Title</p>
                            <input className='input w-full focus:outline-0' type="text" />
                        </div>
                        <div className='w-full'>
                            <p>Description</p>
                            <textarea className='textarea w-full focus:outline-0' name="" id=""></textarea>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='w-full'>
                                <p>Author</p>
                                <input className='input w-full focus:outline-0' name="" id=""></input>
                            </div>
                            <div className='w-full'>
                                <p>Publisher</p>
                                <input className='input w-full focus:outline-0' name="" id=""></input>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#e4e4e4] p-3 rounded-xl'>
                        <h1 className='text-xl my-2'>Pricing And Stock</h1>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            <div className='w-full'>
                                <p>Base pricing</p>
                                <input className='input w-full focus:outline-0' type="text" />
                            </div>
                            <div className='w-full'>
                                <p>Stock</p>
                                <input className='input w-full focus:outline-0' type="text" />
                            </div>
                            <div className='w-full'>
                                <p>Discount</p>
                                <input className='input w-full focus:outline-0' type="text" />
                            </div>
                            <div className='w-full'>
                                <p>Discount Type</p>
                                <input className='input w-full focus:outline-0' type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[45%] h-96 p-5 bg-[#E4E4E4]'>
                    <h1>Upload img</h1>
                    <div>
                        <img src="https://i.ibb.co/gLJMKkSc/ee.png" alt="" />
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default AddBook;