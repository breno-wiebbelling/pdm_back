const jwt = require("jsonwebtoken");
const SECRET = "s5VhA636OTV^z*#2HZ@SA4Bkjq";

const USER_ID_KEY = "USER_ID";

const tokenFromBody = (body) => { return jwt.sign(body, SECRET); }

const tokenFromUserId = (user_id) => {  
    let body = {};
    body[USER_ID_KEY] = user_id;

    return tokenFromBody(body); 
} 

const getBodyFromToken   = (token) => { return jwt.verify(token, SECRET); }
const getUserIdFromToken = (token) => { return getBodyFromToken(token)[USER_ID_KEY]}


module.exports = 
{ 
    tokenFromBody,
    tokenFromUserId,
    getBodyFromToken, 
    getUserIdFromToken,
    USER_ID_KEY
}