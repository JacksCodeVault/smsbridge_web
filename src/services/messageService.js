import api from './api';
import { MESSAGE_ENDPOINTS } from '../configs/config';
import Message from '../models/Message';

export const messageService = {
    async getMessages() {
        const response = await api.get(MESSAGE_ENDPOINTS.GET_ALL);
        return response.data.map(message => new Message(message));
    },

    async sendMessage(messageData) {
        const response = await api.post(MESSAGE_ENDPOINTS.SEND, messageData);
        return new Message(response.data);
    },

    async updateMessageStatus(messageId, status) {
        const response = await api.put(MESSAGE_ENDPOINTS.UPDATE_STATUS(messageId), { status });
        return new Message(response.data);
    },

    async deleteMessage(messageId) {
        await api.delete(MESSAGE_ENDPOINTS.DELETE(messageId));
    },

    async syncMessages(messages) {
        const response = await api.post(MESSAGE_ENDPOINTS.SYNC, { messages });
        return response.data.map(message => new Message(message));
    }
};
