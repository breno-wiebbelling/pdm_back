const tokenManager = require('./tokenManager');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        
        req.body.user_id = tokenManager.getUserIdFromToken(token);

        next();
    }
    catch( err ){
        req.headers.authorization = null;
        res.send("USER NOT AUTHORIZED");
    }
}