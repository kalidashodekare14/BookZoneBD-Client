import { Link } from 'react-router';
import { IoMdClose } from "react-icons/io";

const PaymentCancel = () => {
    return (
        <div className='min-h-[600px]  font-mixed flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='w-32 h-32 bg-red-500 rounded-full flex justify-center items-center text-5xl text-white'>
                    <IoMdClose />
                </div>
                <p className='text-xl'>Your Payment Cancel</p>
                <Link to={'/'} >
                    <button className='btn bg-[#003a5a] text-white'>Back to home</button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancel;