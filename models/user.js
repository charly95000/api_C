const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    firstname : {type:String, required:true},
    lastname : {type:String, required:true},
    email : {type:String, required:true, unique:true},
    password: {type: String, required: true},
    // friends:[{type:mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}]
    },
    {timestamps: true},
)

userSchema.plugin(uniqueValidator);

module.exports= mongoose.model('User',userSchema)