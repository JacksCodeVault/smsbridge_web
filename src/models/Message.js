class Message {
    constructor(data) {
        this.id = data.id;
        this.content = data.content;
        this.recipient = data.recipient;
        this.deviceId = data.deviceId;
        this.status = data.status;
        this.type = data.type;
        this.userId = data.userId;
        this.createdAt = data.createdAt;
    }
}

export default Message;
