import axios from 'axios';

// Configure axios instance, with baseURL, that will be used for all requests and withCredentials set to true
export const api = axios.create({
    baseURL: "http://31.97.151.33:4444",
    withCredentials: true,
});
