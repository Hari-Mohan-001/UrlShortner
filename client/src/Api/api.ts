import { signInData } from "@/types";
import axiosInstance from "./axiosInstance";

export const api = {
  signUp: async (userData: signInData) => {
    try {
      const response = await axiosInstance.post(`/auth/signup`, userData);

      if (response.status === 201) {
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
  login: async (userData: signInData) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, userData);
      if (response.status === 200 || 201) {
        return { success: true, data: response.data };
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
  createShortUrl: async (orginalLink: string, authHeaders: object) => {
    try {
      const response = await axiosInstance.post(
        `/url`,
        { orginalLink },
        authHeaders
      );

      if (response.status === 200 || 201) {
        return { success: true, data: response.data };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  },
  getUserLinks: async (authHeaders: object) => {
    try {
      const response = await axiosInstance.get(`/url`, { ...authHeaders });
      if (response.status === 200 || 201) {
        return { success: true, data: response.data };
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
  markLinkClick: async (id: string, authHeaders: object) => {
    try {
      const response = await axiosInstance.patch(`/url`, { id }, authHeaders);
      if (response.status === 200 || 201) {
        return { success: true, data: response.data };
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
  deleteLink: async (id: string, authHeaders: object) => {
    try {
      const response = await axiosInstance.delete(`/url/${id}`, {
        ...authHeaders,
      });
      if (response.status === 200 || 201) {
        return { success: true, data: response.data };
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
};
