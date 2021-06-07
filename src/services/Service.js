import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
    baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : '//localhost:8000',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401 && store.getters.getIsAuthenticated) {
        store.dispatch('logout')
    }
    return Promise.reject(error);
});

class Service {
    get(path, data) {
        return apiClient.get(path, { params: data })
    }

    post(path, data) {
        return apiClient.post(path, data)
    }

    put(path, data) {
        return apiClient.put(path, data)
    }

    delete(path) {
        return apiClient.delete(path)
    }

    set_token(token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export default new Service()