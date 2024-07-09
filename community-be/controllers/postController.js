const postModel = require('../models/postModel');

exports.getPosts = (req, res) => {
    postModel.getAllPosts((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.createPost = (req, res) => {
    const { title, content, image } = req.body;
    const userId = req.session.user.userId;
    postModel.createPost(userId, title, content, image, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Post created');
    });
};

exports.getPostById = (req, res) => {
    const postId = req.params.id;
    postModel.incrementPostViews(postId, (err) => {
        if (err) return res.status(500).send(err);
        postModel.getPostById(postId, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(404).send('Post not found');
            res.json(results[0]);
        });
    });
};

exports.updatePost = (req, res) => {
    const { title, content, image } = req.body;
    const postId = req.params.id;
    const userId = req.session.user.userId;
    postModel.updatePost(postId, userId, title, content, image, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(403).send('Forbidden');
        res.send('Post updated');
    });
};

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user.userId;
    postModel.deletePost(postId, userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(403).send('Forbidden');
        res.send('Post deleted');
    });
};
