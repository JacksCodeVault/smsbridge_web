export class WebSocketManager {
    constructor(deviceId) {
        this.ws = new WebSocket(`${import.meta.env.VITE_WS_URL}?deviceId=${deviceId}`);
        this.messageHandlers = new Set();
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.messageHandlers.forEach(handler => handler(data));
        };
    }

    addMessageHandler(handler) {
        this.messageHandlers.add(handler);
    }

    removeMessageHandler(handler) {
        this.messageHandlers.delete(handler);
    }

    disconnect() {
        this.ws.close();
    }
}
