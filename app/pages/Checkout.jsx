import React from 'react';

const Checkout = () => {
    return (
        <div className='mx-10 my-10 font-mixed min-h-[600px]'>
            <h1 className='text-3xl'>Sopping Card</h1>
            <div className='flex  justify-between gap-20'>
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>
                                    <div className='flex items-center gap-3'>
                                        <img className='w-14' src="https://i.ibb.co/B5FnVZkm/1735721362.webp" alt="" />
                                        <div>
                                            <p className='font-semibold'>হুমায়ূন আহমেদের সেরা উপন্যাস</p>
                                            <p className='font-normal'>হুমায়ূন আহমেদের </p>
                                        </div>
                                    </div>
                                </th>
                                <td>Hello</td>
                                <td>
                                    <div className='flex flex-row items-center'>
                                        <button className='btn text-xl font-normal hover:bg-[#003a5a] hover:text-white border-[#003a5a]'>-</button>
                                        <input className='input focus:outline-0 w-20' type="text" />
                                        <button className='btn text-xl font-normal hover:bg-[#003a5a] hover:text-white border-[#003a5a]'>+</button>
                                    </div>
                                </td>
                                <td>Blue</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className='w-96 border border-[#bbb] p-3'>
                    <div >
                        <p>Enter Promo Code</p>
                        <div className='flex items-center'>
                            <input className='input focus:outline-0' type="text" />
                            <button className='btn'>Submit</button>
                        </div>
                    </div>
                    <div className='space-y-2 mt-3'>
                        <div className='flex justify-between items-center '>
                            <p>Subtotal:</p>
                            <p>$50.00</p>
                        </div>
                        <div className='flex justify-between items-center '>
                            <p>Sales Tax:</p>
                            <p>$03.00</p>
                        </div>
                        <div className='flex justify-between items-center '>
                            <p>Grand Total: </p>
                            <p>$55.00</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-5'>
                        <button className='btn w-32 bg-[#003a5a] text-white'>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;