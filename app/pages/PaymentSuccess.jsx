import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router';

const PaymentSuccess = () => {
    return (
        <div className='min-h-[600px]  font-mixed flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='w-32 h-32 bg-[#3bb77c] rounded-full flex justify-center items-center text-5xl text-white'>
                    <FaCheck />
                </div>
                <p className='text-xl'>Your Payment Successfully</p>
                <Link to={'/'} >
                    <button className='btn bg-[#003a5a] text-white'>Back to home</button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;