import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_YOUTRACK_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_YOUTRACK_PERM_TOKEN}`,
    },
});

export default api;
