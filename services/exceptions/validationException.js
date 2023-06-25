class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "Validation Error";
        this.message = message;
    }
}

module.exports =  ValidationError;