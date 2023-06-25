const mongo = require('mongoose');

const Record = new mongo.Schema({
    id_creator:    {type:String, required:true},
    type:          {type:String, required:true},
    date:          {type:Date,   required:true},
    amount:        {type:Number, required:true},
    description:   {type:String, required:false}
});

module.exports = mongo.model('Record', Record);