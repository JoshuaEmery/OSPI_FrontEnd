import axios from "axios";

const isDev = (import.meta.env || process.env).MODE === "development";
const API_URL = isDev
  ? (import.meta.env || process.env).VITE_DEV_API_URL
  : (import.meta.env || process.env).VITE_AZURE_API_URL;

// Helper to ensure URL is properly formatted
const formatBaseUrl = (url) => {
  if (!url) return "";
  // Remove trailing slash if it exists
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

// Helper to ensure endpoint is properly formatted
const formatEndpoint = (endpoint) => {
  if (!endpoint) return "/";
  // Ensure endpoint starts with slash
  return endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
};

const api = axios.create({
  baseURL: formatBaseUrl(API_URL),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to log URLs in development
api.interceptors.request.use((config) => {
  if (isDev) {
    console.log("Making request to:", config.baseURL + config.url);
  }
  return config;
});

export const repo = {
  // GET request
  async get(endpoint) {
    try {
      const formattedEndpoint = formatEndpoint(endpoint);
      const response = await api.get(formattedEndpoint);
      return response.data;
    } catch (error) {
      console.error("GET request failed:", {
        url: API_URL + formatEndpoint(endpoint),
        error: error.message,
        response: error.response?.data,
      });
      throw error;
    }
  },

  // POST request
  async post(endpoint, data) {
    try {
      const formattedEndpoint = formatEndpoint(endpoint);
      const response = await api.post(formattedEndpoint, data);
      return response.data;
    } catch (error) {
      console.error("POST request failed:", {
        url: API_URL + formatEndpoint(endpoint),
        error: error.message,
        response: error.response?.data,
      });
      throw error;
    }
  },

  // PUT request
  async put(endpoint, data) {
    try {
      const formattedEndpoint = formatEndpoint(endpoint);
      const response = await api.put(formattedEndpoint, data);
      return response.data;
    } catch (error) {
      console.error("PUT request failed:", {
        url: API_URL + formatEndpoint(endpoint),
        error: error.message,
        response: error.response?.data,
      });
      throw error;
    }
  },

  // DELETE request
  async delete(endpoint) {
    try {
      const formattedEndpoint = formatEndpoint(endpoint);
      const response = await api.delete(formattedEndpoint);
      return response.data;
    } catch (error) {
      console.error("DELETE request failed:", {
        url: API_URL + formatEndpoint(endpoint),
        error: error.message,
        response: error.response?.data,
      });
      throw error;
    }
  },
};
