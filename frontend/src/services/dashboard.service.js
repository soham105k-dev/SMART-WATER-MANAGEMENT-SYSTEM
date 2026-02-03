import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";


 // Get all zones for dashboard
 export const getDashboardZones = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/zones`);
  return response.data;
};


 //Get active alerts for dashboard
 
export const getDashboardAlerts = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/alerts`);
  return response.data;
};
