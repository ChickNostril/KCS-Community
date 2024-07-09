const express = require('express');
const multer = require('multer');
const path = require('path');
const authenticateSession = require('../middlewares/authenticateSession');

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/profiles/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploadProfile = multer({ storage: profileStorage });
const profileImageUpload = uploadProfile.single('profile_image');

const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/posts/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploadPost = multer({ storage: postStorage });
const postImageUpload = uploadPost.single('image');

const router = express.Router();

router.post('/upload/profile', profileImageUpload, (req, res) => {
    const imageUrl = `/uploads/profiles/${req.file.filename}`;
    res.json({ imageUrl });
});

router.post('/upload/post', authenticateSession, postImageUpload, (req, res) => {
    const imageUrl = `/uploads/posts/${req.file.filename}`;
    res.json({ imageUrl });
});

module.exports = router;
