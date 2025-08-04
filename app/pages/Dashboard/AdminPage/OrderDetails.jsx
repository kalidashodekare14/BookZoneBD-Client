import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import { orderDetailsFetched } from '../../../Redux/slice/dashboardSlice/orderDetailsSlice'
import axiosSecure from '../../../utils/axiosSecure';
import { OrbitProgress } from 'react-loading-indicators';

const OrderDetails = () => {
    const { order_id } = useParams()
    const { orderDetails, loading, error } = useSelector((state) => state.viewOrderDetails);
    const dispatch = useDispatch();
    const [dawnloadLoading, setDawnloadLoading] = useState(false);

    console.log('checking order detials', orderDetails)

    useEffect(() => {
        dispatch(orderDetailsFetched({ id: order_id }))
    }, [])

    const handleOrderReceiptDawnload = async () => {
        try {
            setDawnloadLoading(true)
            const res = await axiosSecure.get(`/api/dashboard/order_receipt/${orderDetails._id}`, {
                responseType: 'blob'
            });
            const blob = new Blob([res.data], { type: 'application.pdf' });
            const url = window.URL.createObjectURL(blob);
            // automation url
            const a = document.createElement("a");
            a.href = url;
            a.download = `payment_${orderDetails._id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            console.log('checking pdf', res);
        } catch (error) {
            console.log('pdf dawnload problem', error.message);
        } finally {
            setDawnloadLoading(false);
        }
    }

    return (
        <div className='px-5 py-5 font-mixed bg-[#E0E0E0] min-h-screen w-full'>
            <div className="overflow-x-auto bg-[#ffffffc9]">
                <div className='flex justify-between items-center bg-[#ffffffc9] p-3 rounded-xl'>
                    <p className='font-semibold text-[15px] lg:text-xl'>Orders Manage</p>
                    <button onClick={handleOrderReceiptDawnload} className='btn bg-[#003a5a] text-white'>
                        {dawnloadLoading ? <span class="loader"></span> : "Dawnload Receipt"}
                    </button>
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
                                    <td>
                                        <p className={`${orderDetails.status === "Success" && "bg-[#59b15a] text-white"} ${orderDetails.status === "Pending" && "bg-[#cc554c] text-white"} p-2 rounded-full`}>{orderDetails?.status ? orderDetails?.status : "N/A"}</p>
                                    </td>
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
                            <th>Product Id</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th>View Product</th>
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
                                    <td>{item?.product_id ? item?.product_id : "N/A"}</td>
                                    <td>{item?.prodcut_quantity ? item?.prodcut_quantity : "N/A"}</td>
                                    <td>৳{item?.product_price ? item?.product_price : "N/A"}</td>
                                    <td>৳{item?.product_total_price ? item?.product_total_price : "N/A"}</td>
                                    <td>
                                        <Link to={`/book/${item.product_id}`}>
                                            <button className='btn bg-[#003a5a] text-white'>View Product</button>
                                        </Link>
                                    </td>
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