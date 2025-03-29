import api from "../utils/axiosConfig";
import { toast } from "react-toastify";

export const getPlants = async () => {
  try {
    const response = await api.get("/plants");
    // toast.success("Plants loaded successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to load plants");
    throw error;
  }
};

export const createPlant = async (plantData) => {
  try {
    const response = await api.post("/plants", plantData);
    toast.success("Plant created successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create plant");
    throw error;
  }
};

// export const getPlantsByType = async (type) => {
//   try {
//     const response = await api.get(`plants?type=${type}`);
//     toast.success("Plants filtered successfully!");
//     return response.data;
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Failed to filter plants");
//     throw error;
//   }
// };

export const getDashboardStats = async () => {
  try {
    const response = await api.get(`/dashboard/stats`);
    toast.success("Dashboard data loaded!");
    return response.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to load dashboard data"
    );
    throw error;
  }
};

export const getSalesData = async () => {
  try {
    const response = await api.get("/farmer");
    toast.success("Sales data loaded!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to load sales");
    throw error;
  }
};

export const createSalesData = async (payload) => {
  try {
    const response = await api.post("/farmer", payload);
    toast.success("Sale recorded successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to record sale");
    throw error;
  }
};

export const deletePlant = async (plantId) => {
  try {
    await api.delete(`/plants/${plantId}`);
    toast.success("Plant deleted successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete plant");
    throw error;
  }
};
