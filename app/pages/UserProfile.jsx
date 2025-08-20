import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { FaCamera } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { profileDataUpdate } from '../Redux/slice/profileSlice';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useUser from '../hooks/useUser';
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`

const UserProfile = () => {

    const { user, userImageUpdate } = useAuth()
    const { userData, loading, error } = useUser()
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [imageHosting, setImageHosting] = useState("");
    const [imgHostingLoading, setImgHostingLoading] = useState(false);
    const [isGender, setIsGender] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return null;
        }
    }, [])

    console.log('checking image', userData)

    useEffect(() => {
        if (userData?.image) {
            setImageHosting(userData.image)
        }
    }, [userData?.image])

    useEffect(() => {
        if (userData?.gender) {
            setIsGender(userData.gender)
        }
    }, [userData?.image])


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const userInfo = {
            name: data.name,
            date_of_birth: data.date_of_birth,
            gender: isGender,
            country: data.country,
            city: data.city,
            state: data.state,
            union: data.union,
            address: data.address,
            contact_number: data.contact_number,
            alternative_phone_number: data.alternative_phone_number,
            image: imageHosting

        }
        dispatch(profileDataUpdate({ email: user?.email, data: userInfo }));
        userImageUpdate(imageHosting)
        if (loading === false) {
            onCloseModal()
        }
    }

    const handleImageHosting = async (event) => {
        const imageSelected = event.target.files[0];
        setImgHostingLoading(true)
        const formData = new FormData()
        formData.append("image", imageSelected);
        try {
            const res = await fetch(`${IMG_HOSTING}`, {
                method: "POST",
                body: formData
            })
            const data = await res.json();
            if (data.success) {
                setImageHosting(data.data.url);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setImgHostingLoading(false)
        }
    }

    return (
        <div className='py-10 font-mixed flex justify-center items-center bg-[#e0e0e0]'>
            {
                loading && (
                    <div className='h-40 flex justify-center items-center'>
                        <span class="loader"></span>
                    </div>
                )
            }

            <div className='lg:w-[60%] w-full bg-white p-5'>
                <div className='flex justify-between items-center '>
                    <div className="w-32 h-32 mb-5 rounded-full">
                        <img
                            className='w-full h-full rounded-full'
                            alt={userData?.name || "image"}
                            src={userData?.image || "https://i.ibb.co/WcTWxsN/nav-img.png"} />
                    </div>
                    <div onClick={onOpenModal}>
                        <FaEdit className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='space-y-3'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Name</label>
                        <p className='input focus:outline-0 w-full'>{userData?.name}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Date Of Birth</label>
                            <p className='input focus:outline-0 w-full'>{userData?.date_of_birth}</p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Gender</label>
                            <p className='input w-full rounded-[5px]'>{userData?.gender}</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Email</label>
                        <p className='input focus:outline-0 w-full'>{userData?.email && userData?.email}</p>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Country</label>
                            <p className='input focus:outline-0 w-full' >{userData?.country}</p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">City</label>
                            <p className='input focus:outline-0 w-full' >{userData?.city}</p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">State</label>
                            <p className='input focus:outline-0 w-full' >{userData?.state}</p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Union</label>
                            <p className='input focus:outline-0 w-full' >{userData?.union}</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Address</label>
                        <p className='input focus:outline-0 w-full' >{userData?.address}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Phone Number</label>
                            <p className='input focus:outline-0 w-full'>{userData?.contact_number}</p>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Alternative Phone Number</label>
                            <p className='input focus:outline-0 w-full'>{userData?.alternative_phone_number}</p>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <Modal open={open} onClose={onCloseModal} center>
                    <div className='lg:w-96'>
                        <div className='flex justify-center items-center'>
                            <div className="relative w-28 h-28 mb-5 rounded-full">
                                <img
                                    className='w-full h-full rounded-full'
                                    src={imageHosting ? imageHosting : "https://i.ibb.co/WcTWxsN/nav-img.png"}
                                    alt={userData?.name || "image"}
                                />

                                <div onClick={() => document.querySelector('input[type="file"]').click()} className={`absolute cursor-pointer bottom-0 right-0 ${imgHostingLoading ? "bg-[#39b9ca]" : "bg-[#cfcfcf]"}  p-2 w-10 h-10 flex justify-center items-center rounded-full`}>
                                    {
                                        imgHostingLoading ? <span class="loader"></span> : <FaCamera className=' text-xl' />
                                    }

                                    <input onChange={handleImageHosting} hidden type="file" />
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Name</label>
                                <input {...register("name")} defaultValue={userData?.name} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex lg:flex-row flex-col items-center gap-3'>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Date Of Birth</label>
                                    <input {...register("date_of_birth")} defaultValue={userData?.date_of_birth} className='input focus:outline-0 w-full' type="date" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Gender</label>
                                    <select onChange={(e) => setIsGender(e.target.value)} defaultValue={userData?.gender} className='border border-[#bbb] py-[6px] rounded-[5px]' name="" id="">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Country</label>
                                    <input {...register("country")} defaultValue={userData?.country} className='input focus:outline-0 w-full' type="text" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">City</label>
                                    <input {...register("city")} defaultValue={userData?.city} className='input focus:outline-0 w-full' type="text" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">State</label>
                                    <input {...register("state")} defaultValue={userData?.state} className='input focus:outline-0 w-full' type="text" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Union</label>
                                    <input {...register("union")} defaultValue={userData?.union} className='input focus:outline-0 w-full' type="text" />
                                </div>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Address</label>
                                <input {...register("address")} defaultValue={userData?.address} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Contact Number</label>
                                <input {...register("contact_number")} defaultValue={userData?.contact_number} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Alternative Phone Number</label>
                                <input {...register("alternative_phone_number")} defaultValue={userData?.alternative_phone_number} className='input focus:outline-0 w-full' type="text" />
                            </div>
                            <div className='flex justify-center items-center'>
                                <button className='btn bg-[#003A5A] text-white'>
                                    {loading ? <span class="loader"></span> : "Update here"}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>

        </div>
    );
};

export default UserProfile;