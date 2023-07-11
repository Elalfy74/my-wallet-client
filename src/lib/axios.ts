import axios from 'axios';
import { useAuth } from '@/store/auth';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const { currentUser } = useAuth.getState();

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${currentUser?.accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const { loginUser, currentUser } = useAuth.getState();

    const newAccessToken = response.headers['x-access-token'];

    if (newAccessToken && currentUser && newAccessToken !== currentUser.accessToken) {
      loginUser({ ...currentUser, accessToken: newAccessToken });
    }

    return response;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);
