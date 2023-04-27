import { config } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import { useCallback } from 'react'
// prettier-ignore

/* export const useHttp = () => {
    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        try {
            console.log('body',body);
            const response = await fetch(url, { method, body, headers });
            console.log('запрос');
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch (e) {
            throw e;
        }
    }, []); */
   export const API_URL = `http://localhost:4000/api`;

   const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
   })

   $api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

    $api.interceptors.response.use((config) => {
        return config;
    }, async(error) => {
        const originalRequest = error.config;
        if(error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await axios.get(`${API_URL}/user/refresh`, {withCredentials: true})
                console.log('рефреш: ',response);
                localStorage.setItem('token', response.data.accessToken)
                return $api.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН')
            }
        }
        throw error;
    })

export default $api;