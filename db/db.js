const mongo = require('mongoose');
const pass = 'cBDdjYp2Qdh.aF21';
const logger = require('../services/logger');

const connect = () => {
    logger.green("[mongoose] about to connect with the database")
    return mongo.connect('mongodb+srv://breno:123@calendar.qgo1qex.mongodb.net/?retryWrites=true&w=majority');
};

const verifyConection = async () => {
    if (mongo.connection.readyState !== 1 && mongo.connection.readyState != 2) {
        await connect();
    }
};

module.exports = {
    connect,
    verifyConection
};