import { Youtrack } from './youtrack';

const config = {
    baseUrl: import.meta.env.VITE_YOUTRACK_URL,
    token: import.meta.env.VITE_YOUTRACK_PERM_TOKEN,
};

export const youtrack = new Youtrack(config);
