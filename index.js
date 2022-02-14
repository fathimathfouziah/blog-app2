const express = require('express')
const mongoose = require('mongoose');
const userModel = require('./src/model/users')
const articleInfoModel = require('./src/model/articleinfo')
const jwt = require('jsonwebtoken')
const path =require('path')
//require("dotenv").config();
//const articleInfo = require('./src/model/BlogDB')
const authRoutes=require('./src/routes/auth')
const articleRoutes=require('./src/routes/articleroute')
const authmiddleware=require('./src/middleware/auth')
//mongoose.connect('mongodb://localhost:27017/my-blog');
//mongoose.connect('mongodb+srv://fouziah:fouziahh@cluster0.xg9rl.mongodb.net/my-blog?retryWrites=true&w=majority')
mongoose
  .connect(
    'mongodb+srv://fouziah:fouziahh@cluster0.xg9rl.mongodb.net/my-blog?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));
const cors = require('cors')
const app = express()
app.use(cors())
const PORT = process.env.PORT || 5000
//const PORT = 5001
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
    // res.setheader("Access-Control-Allow-Origin", "*");
    // res.setheader("Access-Control-Allow-Methods: GET POST DELETE PUT")
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use('/api/auth', authRoutes);
app.use('/api/article', articleRoutes);
// app.post('/api/register', async (req, res) => {
//     try {
//         let user = new userModel(req.body)
//         let result = await user.save()

//         res.status(200).json('success');

//     }
//     catch (error) {
//         res.status(400).json('un success');
//     }
// })


if(process.env.NODE_ENV==="production"){
app.use(express.static("blog-app/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./blog-app", "build", "index.html"));
})
}


app.listen(PORT, () => {
    console.log(`I am list at port ${PORT}`)
})
