import React, { useEffect, useState } from 'react';
import { userOrderFetched } from '../Redux/slice/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';

const UserOrders = () => {

    const { userOrder, loading, eror } = useSelector((state) => state.allUserOrder);
    const dispatch = useDispatch();
    const { user } = useAuth()

    console.log('checking order', userOrder);

    useEffect(() => {
        dispatch(userOrderFetched({ email: user?.email }))
    }, [user?.email, dispatch])

    return (
        <div className='lg:px-32 min-h-screen py-10 bg-[#f0f0f0]'>
            {/* <h1 className='text-3xl text-center my-10'>My Orders</h1> */}
            <div className='space-y-5'>
                {
                    userOrder?.map(orders => (
                        <div className='bg-white p-3'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-5'>
                                    <p className='text-xl my-2 font-bold'>ORDER : <span className=''>{orders?.tran_id}</span></p>
                                    <p className='text-[17px]'>{new Date(orders?.createdAt).toLocaleDateString()}</p>
                                </div>
                                <button className='btn bg-[#003a5a] text-white'>Cancel Order</button>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                                {
                                    orders?.products.map(product => (
                                        <Link to={`/book/${product.product_id}`}>
                                            <div className='hover:border hover:border-[#023958] flex items-center gap-2  bg-white border border-[#bbb] p-2'>
                                                <div className=''>
                                                    <img className='w-full h-40' src={product?.product_image} alt="" />
                                                </div>
                                                <div className='list-disc space-y-1'>
                                                    <p className='font-semibold'>{product?.product_name}</p>
                                                    <li>Category: {product?.product_category}</li>
                                                    <li>items: {product?.prodcut_quantity}</li>
                                                    <li className=' font-semibold'>Price: ৳{product?.product_price}</li>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UserOrders;