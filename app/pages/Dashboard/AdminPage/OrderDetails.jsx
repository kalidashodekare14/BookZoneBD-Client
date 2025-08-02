import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { orderDetailsFetched } from '../../../Redux/slice/dashboardSlice/orderDetailsSlice'

const OrderDetails = () => {
    const { order_id } = useParams()
    const { orderDetails, loading, error } = useSelector((state) => state.viewOrderDetails);
    const dispatch = useDispatch();

    console.log('checking order detials', orderDetails)

    useEffect(() => {
        dispatch(orderDetailsFetched({ id: order_id }))
    }, [])

    return (
        <div className='px-5 py-5 font-mixed bg-[#E0E0E0] min-h-screen w-full'>
            <div className="overflow-x-auto bg-[#ffffffc9]">
                <div className='flex justify-between items-center bg-[#ffffffc9] p-3 rounded-xl'>
                    <p className='font-semibold text-[15px] lg:text-xl'>Orders Manage</p>
                </div>
            </div>
            <div className='my-5 grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <div className='bg-[#ffffffc9] p-5 w-full'>
                    <p className='text-2xl mb-5'>Customer & Order</p>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <img className='w-32 h-32 rounded-full' src={`${orderDetails?.image ? orderDetails?.image : "https://i.ibb.co/WcTWxsN/nav-img.png"}`} alt="" />
                            <tbody className='text-[16px]'>
                                <tr>
                                    <th>Name</th>
                                    <td>{orderDetails?.customar_name ? orderDetails?.customar_name : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{orderDetails?.customar_email ? orderDetails?.customar_email : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Contact Number</th>
                                    <td>{orderDetails?.addressData?.phone_number ? orderDetails?.addressData?.phone_number : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Alternative Number</th>
                                    <td>{orderDetails?.addressData?.alternative_phone_number ? orderDetails?.addressData?.alternative_phone_number : "N/A"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='bg-[#ffffffc9] p-5 w-full'>
                    <p className='text-2xl mb-5'>Shipping Address</p>
                    <div className="overflow-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <tbody className='text-[16px]'>
                                <tr>
                                    <th>Country</th>
                                    <td>{orderDetails?.addressData?.country ? orderDetails?.addressData?.country : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>{orderDetails?.addressData?.city ? orderDetails?.addressData?.city : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>State</th>
                                    <td>{orderDetails?.addressData?.state ? orderDetails?.addressData?.state : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Union</th>
                                    <td>{orderDetails?.addressData?.union ? orderDetails?.addressData?.union : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{orderDetails?.addressData?.address ? orderDetails?.addressData?.address : "N/A"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='bg-[#ffffffc9] p-5 w-full'>
                    <p className='text-2xl mb-5'>Payment Info</p>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <tbody className='text-[16px]'>
                                <tr>
                                    <th>Payment Method</th>
                                    <td>Bikash</td>
                                </tr>
                                <tr>
                                    <th>Amount</th>
                                    <td>৳{orderDetails?.amount ? orderDetails?.amount : 0}</td>
                                </tr>
                                <tr>
                                    <th>Payment Status</th>
                                    <td>{orderDetails?.status ? orderDetails?.status : "N/A"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='bg-[#ffffffc9] overflow-x-auto'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Items Name</th>
                            <th>Tran Id</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderDetails?.products?.map(item => (
                                <tr>
                                    <th>
                                        <img className='w-14 h-14 rounded-full' src={`${item?.product_image ? item?.product_image : "https://i.ibb.co/WcTWxsN/nav-img.png"}`} alt="" />
                                    </th>
                                    <td>{item?.product_name ? item?.product_name : "N/A"}</td>
                                    <td>df5465454</td>
                                    <td>{item?.prodcut_quantity ? item?.prodcut_quantity : "N/A"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;