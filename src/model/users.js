const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/my-blog');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name : String,
    email: String,
    password:String,
    isAdmin:{type:Boolean,default:false}
});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;
