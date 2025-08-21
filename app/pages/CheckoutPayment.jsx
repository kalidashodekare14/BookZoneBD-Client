import { useEffect, useState } from 'react';
import cashImage from '../../public/cash.png'
import sslcommerzImage from '../../public/sllcommerz.png'
import { useCart } from 'react-use-cart';
import useUser from '../hooks/useUser';
import { ThreeDot } from 'react-loading-indicators';
import axiosSecure from '../utils/axiosSecure';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { profileDataUpdate, profileData } from '../Redux/slice/profileSlice';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';


const CheckoutPayment = () => {

    const { userData, loading, error } = useUser()
    const [paymentLoading, setPaymentLoading] = useState(false);
    const salesTaxRate = 0.1
    const [isCashOnDalivery, setIsCashOnDalivery] = useState(false);
    const [isSslcommerz, setIsSslcommerz] = useState(false);
    const shipppingAddress = !userData?.name || !userData?.email || !userData?.country || !userData?.address || !userData?.contact_number || !userData?.alternative_phone_number || !userData?.state || !userData?.city || !userData?.union
    const [isAddressText, setIsAddressText] = useState("");
    const dispatch = useDispatch();
    const { user } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        setIsAddressText(userData?.address)
    }, [])

    // Shipping Info Form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    // Product Cart
    const {
        emptyCart,
        items,
        removeItem,
        isEmpty
    } = useCart();

    console.log('checking item', items)

    // product discount 
    const discountedCartTotal = items.reduce((total, item) => {
        const discountedPrice = item.price - (item.price * item.discount / 100);
        return total + discountedPrice * item.quantity;
    }, 0)

    const salesTax = discountedCartTotal * salesTaxRate;
    const grandTotal = discountedCartTotal + salesTax

    // Shipping info submit form
    const onSubmit = async (data) => {
        console.log(data)
        if (isAddressText.length === 0) {
            return console.log('address must required');
        }
        const shippingInfoData = {
            name: data.name,
            contact_number: data.contact_number,
            alternative_phone_number: data.alternative_phone_number,
            country: data.country,
            city: data.city,
            state: data.state,
            union: data.union,
            address: isAddressText
        }
        console.log('checking info', shippingInfoData);
        try {
            await dispatch(profileDataUpdate({ email: user?.email, data: shippingInfoData })).unwrap()
            await dispatch(profileData({ email: user?.email })).unwrap();
            if (isCashOnDalivery) {
                await handleCashOnDelivarySystem();
            } else if (isSslcommerz) {
                await handlePaymentSystem();
            } else {
                console.log('please select payment method');
            }
        } catch (error) {
            console.log('Failed to update profile or procceess payment', error);
        }
    }

    // Cash on dalivary function
    const handleCashOnDelivarySystem = async () => {
        try {

            const updateUserData = await dispatch(profileData({ email: user?.email })).unwrap();
            const customar_info = {
                country: updateUserData?.country,
                address: updateUserData?.address,
                postal_code: "N/A",
                phone_number: updateUserData?.contact_number,
                alternative_phone_number: updateUserData?.alternative_phone_number,
                state: updateUserData?.state,
                city: updateUserData?.city,
                union: updateUserData?.union
            }

            const products = items.map(product => ({
                product_id: product._id,
                product_name: product.title,
                product_category: product.category,
                prodcut_quantity: product.quantity,
                product_image: product.image,
                product_price: product.price,
                product_total_price: product.price * product.quantity
            }))

            const paymentInfo = {
                customar_name: updateUserData?.name,
                customar_email: updateUserData?.email,
                amount: grandTotal,
                image: updateUserData?.image,
                products,
                addressInfo: customar_info,
                currency: "BDT",
                status: "Pending"
            }
            setPaymentLoading(true);
            const res = await axiosSecure.post('/api/order/cash_on_payment', paymentInfo)
            if (res.data.success === true) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your order successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
                emptyCart()
            }

        } catch (error) {
            console.log('check error', error)
            setPaymentLoading(false)
        } finally {
            setPaymentLoading(false)
        }
    }

    // SSLCommerz dalivary function
    const handlePaymentSystem = async () => {
        try {
            const updateUserData = await dispatch(profileData({ email: user?.email })).unwrap();
            const customar_info = {
                country: updateUserData?.country,
                address: updateUserData?.address,
                postal_code: "N/A",
                phone_number: updateUserData?.contact_number,
                alternative_phone_number: updateUserData?.alternative_phone_number,
                state: updateUserData?.state,
                city: updateUserData?.city,
                union: updateUserData?.union
            }

            const products = items.map(product => ({
                product_id: product._id,
                product_name: product.title,
                product_category: product.category,
                prodcut_quantity: product.quantity,
                product_image: product.image,
                product_price: product.price,
                product_total_price: product.price * product.quantity
            }))

            const paymentInfo = {
                customar_name: updateUserData?.name,
                customar_email: updateUserData?.email,
                amount: grandTotal,
                image: updateUserData?.image,
                products,
                addressInfo: customar_info,
                currency: "BDT",
                status: "Pending"
            }
            setPaymentLoading(true);
            const res = await axiosSecure.post('/api/order/payment_integration', paymentInfo)
            const redirecUrl = res.data.paymentUrl;
            if (res.data.success === true) {
                emptyCart()
                window.location.replace(redirecUrl)
            }

        } catch (error) {
            console.log('check error', error)
            setPaymentLoading(false)
        } finally {
            setPaymentLoading(false)
        }
    }

    const handleCashOnDalivery = () => {
        if (!isCashOnDalivery) {
            setIsCashOnDalivery(true);
            setIsSslcommerz(false);
        }

    }
    const handleSslcommerz = () => {
        if (!isSslcommerz) {
            setIsSslcommerz(true)
            setIsCashOnDalivery(false)
        }
    }

    return (
        <div className='lg:px-20 px-5 py-10 font-mixed min-h-[600px] bg-[#e4e4e4]'>
            <div className='flex flex-col lg:flex-row gap-20'>
                <form onSubmit={handleSubmit(onSubmit)} className='lg:w-[65%] space-y-5'>
                    {/* Shipping Address */}
                    {
                        shipppingAddress && (
                            <div className='bg-[#f8f8f8] p-5'>
                                <h1 className='text-xl'>Shipping Address</h1>
                                <div className='w-full'>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="">Name</label>
                                        <input {...register("name")} className='input focus:outline-0 w-full' defaultValue={userData?.name} type="text" />
                                    </div>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 '>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="">Phone Number</label>
                                            <input {...register("contact_number")} className='input focus:outline-0 w-full' defaultValue={userData?.contact_number} type="text" />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="">Alternative Phone Number</label>
                                            <input {...register("alternative_phone_number")} className='input focus:outline-0 w-full' defaultValue={userData?.alternative_phone_number} type="text" />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="">Country</label>
                                            <input {...register("country")} className='input focus:outline-0 w-full' defaultValue={userData?.country} type="text" />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="">City</label>
                                            <input {...register("city")} className='input focus:outline-0 w-full' defaultValue={userData?.city} type="text" />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="">State</label>
                                            <input {...register("state")} className='input focus:outline-0 w-full' defaultValue={userData?.state} type="text" />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="">Union</label>
                                            <input {...register("union")} className='input focus:outline-0 w-full' defaultValue={userData?.union} type="text" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Address</label>
                                        <textarea onChange={(e) => setIsAddressText(e.target.value)} className='textarea focus:outline-0 w-full h-32' defaultValue={userData?.address} placeholder='বাসা/ফ্ল্যাট, পাড়া-মহল্লার নাম, পরিচিতি এলাকা উল্লেখ করুন' name="" id=""></textarea>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* Payment method */}
                    <div className='bg-white p-5'>
                        <h3 className='text-xl my-5'>Payment Method</h3>
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-5'>
                            <div className='w-full'>
                                <p className='pb-1'>Cash On Delivery</p>
                                <div className='flex items-center gap-2 border border-[#bbb] p-2'>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" onChange={handleCashOnDalivery} checked={isCashOnDalivery} className="checkbox" />
                                        <img className='w-10' src={cashImage} alt="" />
                                    </div>
                                    <p>Cash On Dalivery</p>
                                </div>
                            </div>
                            <div className='w-full'>
                                <p className='pb-1'>Payment SSLCommerz</p>
                                <div className='flex items-center gap-5 border border-[#bbb] p-[14px]'>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" onChange={handleSslcommerz} checked={isSslcommerz} className="checkbox" />
                                        <img className='lg:w-32 w-24' src={sslcommerzImage} alt="" />
                                    </div>
                                    <p>Payment SSLCommerz</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center items-center my-5'>
                            {
                                isCashOnDalivery && <button type={"submit"} className='btn w-40 p-5 bg-[#003a5a] text-white'>Confirm Order</button>
                            }
                            {
                                isSslcommerz && (
                                    <button type={"submit"} className='btn w-40 p-5 bg-[#003a5a] text-white'>
                                        {
                                            paymentLoading ? <ThreeDot color="#ffffff" size="small" text="" textColor="" /> : "Confirm Order"
                                        }
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </form>
                <div className='right-20 lg:w-96 h-52 border border-[#bbb] p-3 bg-[#f8f8f8] '>
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
                </div>
            </div>
        </div>
    );
};

export default CheckoutPayment;