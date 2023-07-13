class ClientError extends Error {
    constructor(message) {
        super(message);
        this.name = "Client Error";
        this.message = message;
    }
}

module.exports =  ClientError;