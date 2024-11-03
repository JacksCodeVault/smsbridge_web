import api from './api';
import { DEVICE_ENDPOINTS } from '../configs/config';
import Device from '../models/Device';

export const deviceService = {
    async getDevices() {
        const response = await api.get(DEVICE_ENDPOINTS.GET_ALL);
        return response.data.map(device => new Device(device));
    },
    async getApiKeys() {
        const response = await api.get(DEVICE_ENDPOINTS.GET_API_KEYS);
        return response.data;
    },

    async addDevice(deviceData) {
        const response = await api.post(DEVICE_ENDPOINTS.CREATE, deviceData);
        return new Device(response.data);
    },

    async generateApiKey() {
        const response = await api.post(DEVICE_ENDPOINTS.GENERATE_KEY);
        return response.data;
    },

    async updateDevice(deviceId, updates) {
        const response = await api.put(DEVICE_ENDPOINTS.UPDATE(deviceId), updates);
        return new Device(response.data);
    },

    async deleteDevice(deviceId) {
        await api.delete(DEVICE_ENDPOINTS.DELETE(deviceId));
    },

    async revokeApiKey(keyId) {
        await api.post(DEVICE_ENDPOINTS.REVOKE_KEY, { keyId });
    }
};
