import { signInData } from "@/types";
import axiosInstance from "./axiosInstance";


export const api = {
    signUp : async(userData:signInData)=>{
        try {
            const response = await axiosInstance.post(`/auth/signup`, userData);
            console.log('res',response);
            
            if (response.status ===  201) {
              console.log("api", response.data);
      
              return { success: true, data: response.data.data };
            } else {
              return {
                success: false,
                message: response.data?.message || "Failed to login",
              };
            }
          } catch (error: any) {
            return {
              success: false,
              message: error.response?.data?.message || "An error occurred",
            };
          }
    },
    login : async(userData:signInData)=>{
        try {
            const response = await axiosInstance.post(`/auth/login`, userData);
            console.log('res',response);
            
            if (response.status === 200 || 201) {
              console.log("api", response.data);
              return { success: true, data: response.data};
            } else {
              return {
                success: false,
                message: response.data?.message || "Failed to login",
              };
            }
          } catch (error: any) {
            return {
              success: false,
              message: error.response?.data?.message || "An error occurred",
            };
          }
    }
}