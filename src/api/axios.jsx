import axios from 'axios';

const API_BASE_URL = "http://localhost:3030";

const apiService = {
  signup: async (email, password, name) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      email,
      password,
      name,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    return response.data;
  },
  
  getMemos: async () => {
    const response = await axios.get(`${API_BASE_URL}/memos`);
    return response.data;
  },

  getMemoById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/memos/edit/${id}`);
    return response.data;
  },

  createMemo: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/memos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateMemo: async (id, formData) => {
    const response = await axios.put(`${API_BASE_URL}/memos/edit/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteMemo: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/memos/delete/${id}`);
    return response.data;
  }
};

export default apiService;
