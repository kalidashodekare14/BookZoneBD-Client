import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

export default axiosSecure;