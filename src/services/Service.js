import axios from 'axios'

const apiClient = axios.create({
    baseURL: '//localhost:8000',
    // baseURL: 'https://demapsm-backend.herokuapp.com',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

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
}

export default new Service()