const commentModel = require('../models/commentModel');

exports.createComment = (req, res) => {
    const postId = req.params.postId;
    const userId = req.session.user.userId;
    const { content } = req.body;
    commentModel.createComment(postId, userId, content, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Comment added');
    });
};

exports.getCommentsByPostId = (req, res) => {
    const postId = req.params.postId;
    commentModel.getCommentsByPostId(postId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.updateComment = (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.session.user.userId;
    const { content } = req.body;
    commentModel.updateComment(commentId, userId, content, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(403).send('Forbidden');
        res.send('Comment updated');
    });
};

exports.deleteComment = (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.session.user.userId;
    commentModel.deleteComment(commentId, userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(403).send('Forbidden');
        res.send('Comment deleted');
    });
};
