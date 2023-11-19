import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 7500,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
})
  
export default api;