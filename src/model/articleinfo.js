const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/my-blog');

const Schema = mongoose.Schema;


const articleinfoschema = new Schema({
    name : String,
    title: String,
    username:String,
    description:String,
    upvotes:Number,
    comments:[]
});

const articleInfoModel = mongoose.model('articleinfos',articleinfoschema);

module.exports = articleInfoModel;
