import axios from "axios";

export const getData = async (url, config = {}) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};
