module.exports = class Response {
    constructor(payload, error) {
        this.payload = payload;
        this.error = error;
    }
};