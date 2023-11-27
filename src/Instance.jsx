import axios from "axios";



const createApiInstance = (baseURL) => {
    const api = axios.create({
        baseURL,
        timeout: 7500,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return api;
};



export const parcelsAPI = createApiInstance("http://localhost:8080/api/parcels");
export const usersAPI = createApiInstance("http://localhost:8080/api/users");