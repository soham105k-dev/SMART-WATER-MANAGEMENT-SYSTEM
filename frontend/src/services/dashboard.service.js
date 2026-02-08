import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getDashboardZones = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/zones`);
  return response.data;
};

export const getDashboardAlerts = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/alerts`);
  return response.data;
};

export const getZoneAnalytics = async (zoneId) => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/zones/${zoneId}`);
  return response.data;
};
