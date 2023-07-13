const db = require('../../db/db');
const User = require("../../db/Collections/User");
const tokenManager = require("../auth/tokenManager");

const EntityNotFoundException = require("../exceptions/entityNotFoundException");
const ClientException = require("../exceptions/clientException");

const create = async (new_user) => {
    console.log(`[userService] starting user creation for ${new_user.name || new_user.email} `);
    try{

        await User.validate(new_user);
        await db.verifyConection();

        let user = await User.create(new_user);
        console.log(`[userService] Sucessfully created ${user.name}`);
        
        user.token = tokenManager.tokenFromUserId( user['_id'] );

    }catch(e){

        if(e.code == 11000){
            if(e.message.includes("email")){
                throw new ClientException("email already exist");

            }
            else if(e.message.includes("name")){
                throw new ClientException("name already exist");
            }
        }
        throw new ClientException(e.message);
    }

    return user;
}

const userById = async (user_id) => {

    await db.verifyConection();
    let user = await User.findById(user_id)

    if(user == null) throw new EntityNotFoundException(`User ${user_id} not found`);

    return {"email": user.email, "user":user.name};
}

const login = async (user_email, user_password) => {
    await db.verifyConection();
    let user = await User.findOne({ email:user_email, password: user_password });
    if(user == null) throw new EntityNotFoundException("Email and Password don't match");

    return { user, token: tokenManager.tokenFromUserId( user['_id'] )};
}

const remove = async (user_email, user_password, user_id) => {
    return User.deleteOne({ email:user_email, password: user_password, _id: user_id});
}

module.exports = { create, login, remove, userById };