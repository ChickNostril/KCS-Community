const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.signup = async (req, res) => {
    const { email, password, nickname, profile_image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    userModel.createUser(email, hashedPassword, nickname, profile_image, (err, results) => {
      if (err) return res.status(500).send(err);
      res.send('User registered');
    });
  };

exports.signin = (req, res) => {
    const { email, password } = req.body;
    userModel.findUserByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(401).send('User not found');
        }
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send('Invalid credentials');
        }
        req.session.user = {
            userId: user.userId,
            email: user.email
        };
        res.send('Login successful');
    });
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.clearCookie('connect.sid');
        res.send('Logged out');
    });
};

exports.getUserInfo = (req, res) => {
    const userId = req.session.user.userId;
    userModel.getUserById(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
};

exports.updateUserInfo = (req, res) => {
    const userId = req.session.user.userId;
    const { email, nickname, profile_image } = req.body;
    userModel.updateUser(userId, email, nickname, profile_image, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(403).send('Forbidden');
        res.send('User information updated');
    });
};

exports.updateUserPassword = async (req, res) => {
    const userId = req.session.user.userId;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    userModel.updateUserPassword(userId, hashedPassword, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Password updated');
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.session.user.userId;
    userModel.deleteUser(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        req.session.destroy(err => {
            if (err) return res.status(500).send(err);
            res.send('User account deleted');
        });
    });
};
