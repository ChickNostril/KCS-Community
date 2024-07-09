const express = require('express');
const postController = require('../controllers/postController');
const authenticateSession = require('../middlewares/authenticateSession');
const multer = require('multer');
const path = require('path');

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

router.get('/posts', authenticateSession, postController.getPosts);
router.post('/posts', authenticateSession, postController.createPost);
router.get('/posts/:id', authenticateSession, postController.getPostById);
router.put('/posts/:id', authenticateSession, postController.updatePost);
router.delete('/posts/:id', authenticateSession, postController.deletePost);

module.exports = router;
