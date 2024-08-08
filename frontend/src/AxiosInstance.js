import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/product', // Adjust the base URL as needed

});

export default axiosInstance;
