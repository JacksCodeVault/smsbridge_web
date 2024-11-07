import axios from 'axios'
import { LOCAL_STORAGE_KEY } from '../utils/constants'

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default httpClient
