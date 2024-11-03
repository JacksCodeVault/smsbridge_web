class Device {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.deviceId = data.deviceId;
        this.status = data.status;
        this.userId = data.userId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

export default Device;
