const db = require('./db');

exports.createUser = (email, password, nickname, profileImage, callback) => {
    db.query('INSERT INTO user (email, password, nickname, profile_image) VALUES (?, ?, ?, ?)', 
             [email, password, nickname, profileImage], callback);
};

exports.findUserByEmail = (email, callback) => {
    db.query('SELECT * FROM user WHERE email = ?', [email], callback);
};

exports.getUserById = (userId, callback) => {
    db.query('SELECT email, nickname, profile_image FROM user WHERE userId = ?', [userId], callback);
};

exports.updateUser = (userId, email, nickname, profile_image, callback) => {
    db.query('UPDATE user SET email = ?, nickname = ?, profile_image = ? WHERE userId = ?', 
             [email, nickname, profile_image, userId], callback);
};

exports.updateUserPassword = (userId, password, callback) => {
    db.query('UPDATE user SET password = ? WHERE userId = ?', [password, userId], callback);
};

exports.deleteUser = (userId, callback) => {
    db.query('DELETE FROM user WHERE userId = ?', [userId], callback);
};
