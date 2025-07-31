import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

}, (error) => {
    return Promise.reject(error);
});

// axiosSecure.interceptors.response.use(
//     response => response,
//     error => {
//         const status = error?.response?.status
//         if (status === 401 || status === 403 || status === 400) {
//             const auth = getAuth();
//             signOut(auth)
//                 .then(() => {
//                     localStorage.removeItem('token');
//                     window.location.href = '/login';
//                 })
//                 .catch(error => {
//                     console.log('Logout failed', error);
//                 })
//         }
//         return Promise.reject(error);
//     }

// )


export default axiosSecure;