import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: "https://book-zone-bd-server.vercel.app",
    // baseURL: "http://localhost:5000",
    withCredentials: true
});


export default axiosPublic;