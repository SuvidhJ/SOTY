import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://soty-backend-25.vercel.app/"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

// axiosInstance.interceptors.request.use((config)=>{
//     // const token = Cookies.get("token");
//     const token = localStorage.getItem('token');
//     if (token && token !== ""){
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (error)=>{
//     return Promise.reject(error);
// })

export default axiosInstance;

