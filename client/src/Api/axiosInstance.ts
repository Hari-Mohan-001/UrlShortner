import axios from "axios";


const Base_Url = 'https://urlshortner-hbie.onrender.com'

const axiosInstance = axios.create({
    baseURL:Base_Url,
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
})

export default axiosInstance