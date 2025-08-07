import React, { useEffect, useState } from 'react';
import { userOrderFetched, orderStatusUpdate } from '../Redux/slice/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserOrders = () => {

    const { userOrder, loading, eror } = useSelector((state) => state.allUserOrder);
    const dispatch = useDispatch();
    const { user } = useAuth()

    console.log('checking order', userOrder);

    useEffect(() => {
        dispatch(userOrderFetched({ email: user?.email }))
    }, [user?.email, dispatch])

    const handleUserOrderStatus = (isId, isStatus) => {

        if (isStatus.order_status === "Processing") {
            return toast.warning("Your order Processing");
        } else if (isStatus.order_status === "Delivered") {
            return toast.warning("Your order Delivered");
        } else if (isStatus.order_status === "Cancelled") {
            return toast.warning("Your order Cancelled");
        }

        const orderStatus = {
            order_status: "Cancelled"
        }
        dispatch(orderStatusUpdate({ id: isId.id, data: orderStatus }))
    }

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
                                <button onClick={(event) => handleUserOrderStatus({ id: orders._id }, { order_status: orders.order_status })} className={`${orders?.order_status === "Delivered" && "bg-[#59b15a] text-white"} ${orders?.order_status === "Pending" && "bg-[#0077b6] text-white"} ${orders?.order_status === "Processing" && "bg-[#e09f3e] text-white"} ${orders?.order_status === "Cancelled" && "bg-[#ef233c] text-white"} btn bg-[#003a5a] text-white`}>
                                    {
                                        orders?.order_status === "Pending" && "Cencel"
                                    }
                                    {
                                        orders?.order_status === "Processing" && "Processing"
                                    }
                                    {
                                        orders?.order_status === "Delivered" && "Delivered"
                                    }
                                    {
                                        orders?.order_status === "Cancelled" && "Cancelled"
                                    }
                                </button>
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
            <ToastContainer />
        </div >
    );
};

export default UserOrders;