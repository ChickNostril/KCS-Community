const express = require('express');
const commentController = require('../controllers/commentController');
const authenticateSession = require('../middlewares/authenticateSession');

const router = express.Router();

router.post('/posts/:postId/comments', authenticateSession, commentController.createComment);
router.get('/posts/:postId/comments', authenticateSession, commentController.getCommentsByPostId);
router.put('/comments/:commentId', authenticateSession, commentController.updateComment);
router.delete('/comments/:commentId', authenticateSession, commentController.deleteComment);

module.exports = router;
