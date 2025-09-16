import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'http://192.168.0.3:3000/api/v1',
   timeout: 10000,
});

export default axiosInstance;
