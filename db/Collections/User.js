const mongo = require('mongoose');

const User = new mongo.Schema({
    name:          {type:String, required:true, unique: true},
    email:         {type:String, required:true, unique: true},
    password:      {type:String, required:true},
});

module.exports = mongo.model('User', User);