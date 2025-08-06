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
        <div className='mx-32 min-h-screen'>
            <h1 className='text-3xl text-center my-10'>My Orders</h1>
            <div>
                {
                    userOrder?.map(orders => (
                        <div className='bg-[#f3f2f2] p-3'>
                            <div className='flex justify-between items-center'>
                                <p className='text-xl my-2'>Your Order ID: <span className='text-[#40b47f]'>{orders?.tran_id}</span></p>
                                <button className='btn bg-[#003a5a] text-white'>Order Cancel</button>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-5 gap-2'>
                                {
                                    orders?.products.map(product => (
                                        <div className='flex flex-col gap-2 bg-white border border-[#bbb] p-2'>
                                            <img className='w-full h-52' src={product?.product_image} alt="" />
                                            <p>{product?.product_name}</p>
                                            <p className='text-xl font-semibold'>৳{product?.product_price}</p>
                                            <p>items: {product?.prodcut_quantity}</p>
                                            <Link to={`/book/${product?.product_id}`}>
                                                <button className='btn w-full bg-[#003a5a] text-white'>View Details</button>
                                            </Link>
                                        </div>
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