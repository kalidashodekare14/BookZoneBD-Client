import React from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from 'react-use-cart';
import axiosSecure from '../utils/axiosSecure';
import useUser from '../hooks/useUser';

const Checkout = () => {

    const [userData, loading, error] = useUser()
    const salesTaxRate = 0.1


    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        cartTotal,
        removeItem,
    } = useCart();

    const discountedCartTotal = items.reduce((total, item) => {
        const discountedPrice = item.price - (item.price * item.discount / 100);
        return total + discountedPrice * item.quantity;
    }, 0)

    const salesTax = discountedCartTotal * salesTaxRate;
    const grandTotal = discountedCartTotal + salesTax


    const handlePaymentSystem = async () => {

        try {
            const products = items.map(product => ({
                product_name: product.title,
                product_category: product.category,
                prodcut_quantity: product.quantity,
                product_image: product.image
            }))

            const paymentInfo = {
                tran_id: "dfkjeikd",
                customar_name: userData?.name,
                customar_email: userData?.email,
                amount: grandTotal,
                image: userData?.image,
                products,
                addressInfo: {
                    country: "Bangladesh",
                    address: userData?.address,
                    postal_code: "5200",
                    phone_number: userData?.contact_number,
                    state: "Dhaka",
                },
                currency: "BDT",
                status: "Pending"
            }

            console.log('checking data for paymentInfo', paymentInfo)

            axiosSecure.post('/api/payment/payment_integration', paymentInfo)
                .then(res => {
                    console.log('checking payment data', res)
                })


        } catch (error) {
            console.log('check error', error)
        }



    }


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
                                <th>Clear</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map(item => (
                                    <tr>
                                        <th>
                                            <div className='flex items-center gap-3'>
                                                <img className='w-14' src={item.image} alt="" />
                                                <div>
                                                    <p className='font-semibold'>{item.title}</p>
                                                    <p className='font-normal'>{item.author}</p>
                                                </div>
                                            </div>
                                        </th>
                                        <td>৳{item.price - (item.price * item.discount / 100)}</td>
                                        <td>
                                            <div className='flex flex-row items-center'>
                                                <button onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))} className='btn text-xl font-normal hover:bg-[#003a5a] hover:text-white border-[#003a5a]'>-</button>
                                                <input value={item.quantity} className='text-center input focus:outline-0 w-20' type="text" />
                                                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className='btn text-xl font-normal hover:bg-[#003a5a] hover:text-white border-[#003a5a]'>+</button>
                                            </div>
                                        </td>
                                        <td>৳{((item.price - (item.price * item.discount / 100)) * item.quantity)}</td>
                                        <td onClick={() => removeItem(item.id)}><IoIosCloseCircle className='text-red-500 text-2xl cursor-pointer' /></td>
                                    </tr>
                                ))
                            }
                            {
                                isEmpty && (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>No data</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
                <div className='w-96 h-72 border border-[#bbb] p-3'>
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
                            <p>৳{discountedCartTotal}</p>
                        </div>
                        <div className='flex justify-between items-center '>
                            <p>Sales Tax:</p>
                            <p>৳{salesTax}</p>
                        </div>
                        <div className='flex justify-between items-center '>
                            <p>Grand Total: </p>
                            <p>৳{grandTotal}</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-5'>
                        <button onClick={handlePaymentSystem} className='btn w-32 bg-[#003a5a] text-white'>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;