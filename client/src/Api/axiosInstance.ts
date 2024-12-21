import axios from "axios";


const Base_Url = 'http://localhost:3000'

const axiosInstance = axios.create({
    baseURL:Base_Url,
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
})

export default axiosInstance