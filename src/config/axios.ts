import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// Configure axios instance, with baseURL, that will be used for all requests and withCredentials set to true
export const api = axios.create({
    baseURL: `${API_URL}/`,
    withCredentials: true,
});
