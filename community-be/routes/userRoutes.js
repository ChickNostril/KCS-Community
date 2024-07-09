const express = require('express');
const userController = require('../controllers/userController');
const authenticateSession = require('../middlewares/authenticateSession');
const multer = require('multer');
const path = require('path');

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

const router = express.Router();

router.post('/signup', profileImageUpload, userController.signup);
router.post('/signin', userController.signin);
router.post('/logout', authenticateSession, userController.logout);
router.get('/user', authenticateSession, userController.getUserInfo);
router.put('/user', authenticateSession, userController.updateUserInfo);
router.put('/user/password', authenticateSession, userController.updateUserPassword);
router.delete('/user', authenticateSession, userController.deleteUser);

module.exports = router;
