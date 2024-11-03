import api from './api';
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from '../configs/config';
import { auth } from '@/configs/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const authService = {
  async login(email, password) {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(firstName, lastName, email, password) {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, {
      email,
      password,
      firstName,
      lastName
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    
    const response = await api.post(AUTH_ENDPOINTS.GOOGLE_LOGIN, { 
      tokenId: idToken 
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async forgotPassword(email) {
    return await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getCurrentUser() {
    const response = await api.get(USER_ENDPOINTS.GET_PROFILE);
    return response.data;
  },

  setUserData(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  },

  getUserData() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
};
