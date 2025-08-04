import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from 'react-use-cart';
import 'react-responsive-modal/styles.css';
import { Link } from 'react-router';
import useUser from '../hooks/useUser';
import { FaCheck, FaEdit } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { profileDataUpdate } from '../Redux/slice/profileSlice';
import useAuth from '../hooks/useAuth';

const Checkout = () => {

    const { userData, loading, error } = useUser();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const dispatch = useDispatch();
    const [isAddressText, setIsAddressText] = useState(userData?.address);
    console.log('checking textarea', isAddressText)
    const shippingInfo = userData?.name && userData?.email && userData?.country && userData?.address && userData?.contact_number && userData?.alternative_phone_number && userData?.state && userData?.city && userData?.union


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
    const grandTotal = discountedCartTotal + salesTax;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        if (isAddressText.length === 0) {
            return console.log('address must required');
        }
        const shippingInfo = {
            name: data.name,
            contact_number: data.contact_number,
            city: data.city,
            state: data.state,
            union: data.union,
            address: isAddressText
        }

        console.log('checking datas', shippingInfo)
        dispatch(profileDataUpdate({ email: user?.email, data: shippingInfo }))
        if (loading === false) {
            onCloseModal()
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
                                items.map(item => {

                                    return (
                                        <tr>
                                            <th>
                                                <div className='flex items-center gap-3'>
                                                    <img className='w-14' src={item.image} alt="" />
                                                    <div>
                                                        <p className='font-semibold'>{item.title}</p>
                                                        <p className='font-normal'>{item?.author?.author_name}</p>
                                                    </div>
                                                </div>
                                            </th>

                                            <td>৳{item.price - (item.price * item.discount / 100).toFixed(2)}</td>
                                            <td>
                                                <div className='flex flex-row items-center'>
                                                    <button onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))} className='btn text-xl font-normal hover:bg-[#003a5a] hover:text-white border-[#003a5a]'>-</button>
                                                    <input value={item.quantity} className='text-center input focus:outline-0 w-20' type="text" />
                                                    <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className='btn text-xl font-normal hover:bg-[#003a5a] hover:text-white border-[#003a5a]'>+</button>
                                                </div>
                                            </td>
                                            <td>৳{((item.price - (item.price * item.discount / 100)) * item.quantity).toFixed(2)}</td>
                                            <td onClick={() => removeItem(item.id)}><IoIosCloseCircle className='text-red-500 text-2xl cursor-pointer' /></td>
                                        </tr>
                                    )
                                })
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
                <div className='w-96 space-y-2'>
                    {
                        shippingInfo && (
                            <div className='border border-[#bbb] p-3'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-xl mb-3'>Shipping Address</p>
                                    <FaEdit onClick={onOpenModal} className='text-xl cursor-pointer' />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <FaCheck className='text-[#22a733]' />
                                    <h2>{userData?.state}</h2>
                                </div>
                                <p className='text-[#535353]'>{userData?.name}</p>
                                <p className='text-[#535353]'>{userData?.contact_number}</p>
                            </div>
                        )
                    }
                    <div className='h-72 border border-[#bbb] p-3'>
                        <div >
                            <p className='text-xl mb-3'>Enter Promo Code</p>
                            <div className='flex items-center'>
                                <input className='input focus:outline-0' type="text" />
                                <button className='btn'>Submit</button>
                            </div>
                        </div>
                        <div className='space-y-2 mt-3'>
                            <div className='flex justify-between items-center '>
                                <p>Subtotal:</p>
                                <p>৳{discountedCartTotal.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between items-center '>
                                <p>Sales Tax:</p>
                                <p>৳{salesTax.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between items-center '>
                                <p>Grand Total: </p>
                                <p>৳{grandTotal.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-5'>
                            <Link to={isEmpty ? "" : "/checkout_payment"} >
                                <button disabled={isEmpty} className='btn w-52 bg-[#003a5a] text-white'>Proceed to checkout</button>
                            </Link>

                        </div>
                    </div>
                </div>
                <Modal open={open} onClose={onCloseModal} center>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                        <p className='mb-5'>Shopping Info</p>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='w-full'>
                                <input {...register("name", { required: true })} className='input focus:outline-0 w-full' defaultValue={userData?.name} type="text" />
                            </div>
                            <div className='w-full'>
                                <input {...register("contact_number", { required: true })} className='input focus:outline-0 w-full' defaultValue={userData?.contact_number} type="text" />
                            </div>
                            <div className='w-full'>
                                <input {...register("city", { required: true })} className='input focus:outline-0 w-full' defaultValue={userData?.city} type="text" />
                            </div>
                            <div className='w-full'>
                                <input {...register("state", { required: true })} className='input focus:outline-0 w-full' defaultValue={userData?.state} type="text" />
                            </div>
                        </div>
                        <div className='w-full'>
                            <input {...register("union", { required: true })} className='input focus:outline-0 w-full' defaultValue={userData?.union} type="text" />
                        </div>
                        <div className='w-full'>

                            <textarea onChange={(e) => setIsAddressText(e.target.value)}
                                defaultValue={userData?.address}
                                className='textarea focus:outline-0 w-full'
                                name=""
                                id=""></textarea>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button type='submit' className='btn w-32 bg-[#003a5a] text-white'>Save</button>
                        </div>
                    </form>
                </Modal>
            </div >
        </div >
    );
};

export default Checkout;