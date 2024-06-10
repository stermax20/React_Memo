import axios from "axios";

const API_BASE_URL = "http://localhost:3030/auth";

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  },

  signup: async (email, password, name) => {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email,
      password,
      name,
    });
    return response.data;
  },
};

export default authService;
