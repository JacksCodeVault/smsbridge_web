import httpClient from '../lib/httpClient'
import { API_ENDPOINTS } from '../utils/constants'
import { saveUserAndToken, removeUserAndToken } from '../utils/helpers'

export const authService = {
    login: async (credentials) => {
        const response = await httpClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
        saveUserAndToken(response.data.user, response.data.token)
        return response.data
    },
    
    register: async (userData) => {
        const response = await httpClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)
        saveUserAndToken(response.data.user, response.data.token)
        return response.data
    },
    
    resetPassword: async (data) => 
        httpClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data),
    
    requestPasswordReset: async (email) => 
        httpClient.post(API_ENDPOINTS.AUTH.REQUEST_RESET, { email }),
    
    updateProfile: async (profileData) => 
        httpClient.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, profileData),
    
    logout: () => {
        removeUserAndToken()
    }
}