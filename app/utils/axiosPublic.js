import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: "https://book-zone-bd-server.vercel.app",
    withCredentials: true
});


export default axiosPublic;