const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//now we do not have to define password or username because we will be using passport 
//this will create username and password for us 
//its also going to make sure that all the username are unique 

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);