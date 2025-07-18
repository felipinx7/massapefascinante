import axios from 'axios';

// Configure axios instance, with baseURL, that will be used for all requests and withCredentials set to true
export const api = axios.create({
    baseURL: "https://api.massapefascinante.com.br/api/",
    withCredentials: true,
});
