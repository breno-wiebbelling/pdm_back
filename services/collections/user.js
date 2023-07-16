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
        
        return { user, token: tokenManager.tokenFromUserId( user['_id'] )};
    }catch(e){
        if(e.code == 11000){
            if(e.message.includes("email")){
                throw new ClientException("Email já registrado");

            }
            else if(e.message.includes("name")){
                throw new ClientException("Nome já registrado");
            }
        }
        throw new ClientException(e.message);
    }
}

const userById = async (user_id) => {
    await db.verifyConection();
    let user = await User.findById(user_id)

    if(user == null) throw new EntityNotFoundException(`Usuário ${user_id} não encontrado`);

    return {"email": user.email, "user":user.name};
}

const login = async (user_email, user_password) => {
    await db.verifyConection();
    let user = await User.findOne({ email:user_email, password: user_password });

    if(user == null) throw new EntityNotFoundException("Email ou senha não combinam");

    return { user, token: tokenManager.tokenFromUserId( user['_id'] )};
}

const updateCredentials = async (user_id, new_username, new_email, given_password) => {
    await db.verifyConection();
    
    let user = await User.findOneAndUpdate(
        { _id:user_id, password: given_password }, 
        {email: new_email, name: new_username}
    )

    return user != null
}   

const updatePassword = async (user_id, user_email, prev_pass, new_pass) => {
    await db.verifyConection();
    
    let user = await User.findOneAndUpdate(
        { _id:user_id, email: user_email, password: prev_pass }, 
        { password: new_pass }
    )

    return user != null
}

module.exports = { create, login, userById, updateCredentials, updatePassword };