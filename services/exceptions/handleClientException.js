const logger = require('../logger');

const handleClientException = (res, e) => {
    logger.red(`[error] ${e.message}`);

    if(e.name==='ValidationError') { res.status(403) }
    else { res.status(500) }
}

module.exports = handleClientException;