class WebSocketService {
    constructor() {
      this.ws = null
      this.messageHandlers = new Set()
    }
  
    connect() {
      this.ws = new WebSocket('ws://localhost:3000')
      
      this.ws.onopen = () => {
        console.log('WebSocket Connected')
      }
  
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.messageHandlers.forEach(handler => handler(data))
      }
  
      this.ws.onclose = () => {
        console.log('WebSocket Disconnected')
        setTimeout(() => this.connect(), 5000)
      }
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close()
      }
    }
  
    onMessage(handler) {
      this.messageHandlers.add(handler)
      return () => this.messageHandlers.delete(handler)
    }
  
    send(data) {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(data))
      }
    }
  }
  
  export const websocketService = new WebSocketService()
  