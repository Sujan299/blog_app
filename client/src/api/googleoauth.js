import axios from 'axios';

const api = axios.create({
    // baseURL: "https://blog-app-rdnu.onrender.com/auth"
    baseURL: "http://localhost:3000/auth"
});

export const googleAuth = (code) => {
    return api.get(`/google?code=${code}`);
};