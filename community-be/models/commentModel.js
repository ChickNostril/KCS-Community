const db = require('./db');

exports.createComment = (postId, userId, content, callback) => {
    db.query('INSERT INTO comments (postId, userId, content) VALUES (?, ?, ?)', 
             [postId, userId, content], callback);
};

exports.getCommentsByPostId = (postId, callback) => {
    db.query('SELECT comments.*, user.nickname, user.profile_image FROM comments INNER JOIN user ON comments.userId = user.userId WHERE postId = ?', 
             [postId], callback);
};

exports.updateComment = (commentId, userId, content, callback) => {
    db.query('UPDATE comments SET content = ? WHERE commentId = ? AND userId = ?', 
             [content, commentId, userId], callback);
};

exports.deleteComment = (commentId, userId, callback) => {
    db.query('DELETE FROM comments WHERE commentId = ? AND userId = ?', 
             [commentId, userId], callback);
};
