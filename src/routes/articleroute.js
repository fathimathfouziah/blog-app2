const express=require('express')
const router = express.Router()
const articleInfoModel=require('../model/articleinfo')
const authmiddleware=require('../middleware/auth')
router.get('/getallarticles', async (req, res) => {

    try {
        let articlelist = await articleInfoModel.find({})
        res.status(200).json({ status: 'success', data: articlelist });
    }

    catch (error) {

    }
})
router.post('/addarticle',authmiddleware, async (req, res) => {
    let name = req.body.name;
    let title = req.body.title;
    let description = req.body.description;
    let username = req.body.username;
    try {
        let article = new articleInfoModel({
            name: name,
            title: title,
            description: description,
            username: username,
            upvotes: 0,
            comments: { username: '', text: '' }
        });
        let result = await article.save()
        res.status(200).json({ status: 'success', data: result });
    }
    catch (error) {
        res.status(400).json('un success');
    }
})
router.post('/editarticle/:uniqueid',authmiddleware, async (req, res) => {
    let name = req.body.name;
    let title = req.body.title;
    let description = req.body.description;
    let username = req.body.username;
    let uniqueid = req.params.uniqueid
    
    try {

        const filter = { _id: uniqueid };
        const update = { name: name, title: title, description: description };

        let result = await articleInfoModel.findOneAndUpdate(filter, update, { new: true });

        res.status(200).json({ status: 'success', data: result });
    }
    catch (error) {
        res.status(400).json('un success');
    }
})
router.delete('/deletearticle/:_id',authmiddleware, async (req, res) => {
    
    let uniqueid = req.params._id
    
    try {
        const filter = { _id: uniqueid };       
        let result = await articleInfoModel.findByIdAndDelete(uniqueid);
        res.status(200).json({ status: 'success' });
    }
    catch (error) {
        res.status(400).json('un success');
    }
})
router.post('/api/login', async (req, res) => {
    try {
        let userEmail = req.body.email
        let passWord = req.body.password
        let result = await userModel.find({ $and: [{ email: userEmail }, { password: passWord }] })
        if (result.length > 0) {
            res.status(200).json({ status: 'success', data: result });
        }
        else {
            res.status(400).json({ status: 'un success' });
        }

    }
    catch (error) {
        res.status(400).json('un success');
    }
})



router.get('/:uniqueid', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET POST DELETE PUT")
    const articleId = req.params.uniqueid
    articleInfoModel.findOne({ _id: articleId })
        .then(function (article) {
            res.json(article)
        })

})
router.post('/:uniqueid/upvote', async (req, res) => {
    try {
        const articleId = req.params.uniqueid;
        const filter = { _id: articleId }
        const update = { $inc: { upvotes: 1 } }
        const option = { new: true }
        articleInfoModel.findOneAndUpdate(filter, update, option)
            .then(function (article) {
                res.status(200).json(article);
            })

    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
});
router.post('/:uniqueid/comments', async (req, res) => {
    try {
        const articleId = req.params.uniqueid;
        const filter = { _id: articleId }
        const { username, text } = req.body
        const update = { $push: { comments: { username, text } } }
        const option = { new: true }
        articleInfoModel.findOneAndUpdate(filter, update, option)
            .then(function (article) {
                res.status(200).json(article);
            })

    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
});

module.exports=router