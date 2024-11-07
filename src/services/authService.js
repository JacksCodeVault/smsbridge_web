
import { authAPI, userAPI } from '@/lib/api';
import { setAuthToken, clearAuthToken } from '@/lib/httpClient';
import { saveUserAndToken, removeUserAndToken, getStoredUser } from '@/utils/helpers';

class AuthService {
    constructor() {
        this.user = getStoredUser();
    }

    async login(email, password) {
        console.log('AuthService: Login attempt', { email })
        const response = await authAPI.login({ email, password })
        console.log('AuthService: Login response', response)
        setAuthToken(response.token)
        saveUserAndToken(response.user, response.token)
        this.user = response.user
        return response
    }
    
    
    async register(userData) {
        console.log('AuthService: Registering user with data:', userData)
        try {
            const response = await authAPI.register(userData)
            console.log('AuthService: Registration response:', response)
            setAuthToken(response.token)
            saveUserAndToken(response.user, response.token)
            this.user = response.user
            return response
        } catch (error) {
            console.error('AuthService: Registration error:', error)
            throw error
        }
    }
    
    

    async validateApiKey(apiKey) {
        try {
            const response = await authAPI.validateApiKey(apiKey);
            return response.valid;
        } catch (error) {
            return false;
        }
    }

    async authenticateDevice(deviceId, apiKey) {
        try {
            const response = await authAPI.deviceAuth(deviceId, apiKey);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(profileData) {
        console.log('AuthService: Updating profile with data:', profileData)
        const response = await userAPI.updateProfile(profileData)
        this.user = { ...this.user, ...response.data }
        saveUserAndToken(this.user, localStorage.getItem('token'))
        return response
    }

    async deleteAccount() {
        console.log('AuthService: Deleting account')
        await userAPI.deleteAccount()
        this.logout()
    }

    logout() {
        clearAuthToken();
        removeUserAndToken();
        this.user = null;
        window.location.href = '/login';
    }

    isAuthenticated() {
        return !!this.user;
    }

    getCurrentUser() {
        return this.user;
    }
}

export default new AuthService();