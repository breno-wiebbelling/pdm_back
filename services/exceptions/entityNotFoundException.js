class EntityNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "Entity not found Error";
        this.message = message;
    }
}

module.exports =  EntityNotFoundError;