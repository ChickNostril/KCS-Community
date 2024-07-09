const db = require('./db');

exports.getAllPosts = (callback) => {
    db.query(`SELECT 
                post.*, 
                user.nickname, 
                user.profile_image,
                (SELECT COUNT(*) FROM comments WHERE postId = post.postId) AS comment_count
            FROM post 
            INNER JOIN user ON post.userId = user.userId`, callback);
};

exports.createPost = (userId, title, content, image, callback) => {
    db.query('INSERT INTO post (userId, title, content, image, likes) VALUES (?, ?, ?, ?, 0)',
             [userId, title, content, image], callback);
};

exports.incrementPostViews = (postId, callback) => {
    db.query('UPDATE post SET views = views + 1 WHERE postId = ?', [postId], callback);
};

exports.getPostById = (postId, callback) => {
    db.query(`SELECT 
                post.*, 
                user.nickname, 
                user.profile_image,
                (SELECT COUNT(*) FROM comments WHERE postId = post.postId) AS comment_count
              FROM post 
              INNER JOIN user ON post.userId = user.userId 
              WHERE postId = ?`, [postId], callback);
};

exports.updatePost = (postId, userId, title, content, image, callback) => {
    db.query('UPDATE post SET title = ?, content = ?, image = ?, updated = NOW() WHERE postId = ? AND userId = ?',
             [title, content, image, postId, userId], callback);
};

exports.deletePost = (postId, userId, callback) => {
    db.query('DELETE FROM post WHERE postId = ? AND userId = ?', [postId, userId], callback);
};
