const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

// CORS 옵션 설정
const corsOptions = {
    origin: 'http://localhost:3000', // 허용할 도메인
    credentials: true // 인증 정보를 포함하는 요청 허용
};
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(session({
    key: 'session_cookie',
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}));
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '628310',
    database: 'community_db'
});
db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});
const authenticateSession = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }
    next();
};


// Multer storage configuration for profile images
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/profiles/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploadProfile = multer({ storage: profileStorage });
// Middleware to handle single file uploads for profile images
const profileImageUpload = uploadProfile.single('profile_image');

// Multer storage configuration for post images
const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/posts/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploadPost = multer({ storage: postStorage });
// Middleware to handle single file uploads for post images
const postImageUpload = uploadPost.single('image');

//프로필 업로드
app.post('/upload/profile', authenticateSession, profileImageUpload, (req, res) => {
    const imageUrl = `/uploads/profiles/${req.file.filename}`;
    res.json({ imageUrl });
});
// 이미지 업로드
app.post('/upload/post', authenticateSession, postImageUpload, (req, res) => {
    const imageUrl = `/uploads/posts/${req.file.filename}`;
    res.json({ imageUrl });
});



//회원가입
app.post('/signup', profileImageUpload, async (req, res) => {
    const { email, password, nickname } = req.body;
    const profileImage = req.file ? `/uploads/profiles/${req.file.filename}` : null;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO user (email, password, nickname, profile_image) VALUES (?, ?, ?, ?)', [email, hashedPassword, nickname, profileImage], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User registered');
    });
});
//로그인
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
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
        // 세션에 사용자 정보 저장
        req.session.user = {
            userId: user.userId,
            email: user.email
        };
        res.send('Login successful');
    });
});
// 로그아웃
app.post('/logout', authenticateSession, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.clearCookie('connect.sid');
        res.send('Logged out');
    });
});
// 회원정보 조회
app.get('/user', authenticateSession, (req, res) => {
    const userId = req.session.user.userId;
    db.query('SELECT email, nickname, profile_image FROM user WHERE userId = ?', [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});
// 회원 정보 수정
app.put('/user', authenticateSession, (req, res) => {
    const userId = req.session.user.userId;
    const { email, nickname, profile_image } = req.body;
    db.query(
        'UPDATE user SET email = ?, nickname = ?, profile_image = ? WHERE userId = ?', 
        [email, nickname, profile_image, userId], 
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(403).send('Forbidden');
            res.send('User information updated');
        }
    );
});
// 비밀번호 수정
app.put('/user/password', authenticateSession, async (req, res) => {
    const userId = req.session.user.userId;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('UPDATE user SET password = ? WHERE userId = ?', [hashedPassword, userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Password updated');
    });
});
// 회원 탈퇴
app.delete('/user', authenticateSession, (req, res) => {
    const userId = req.session.user.userId;
    db.query('DELETE FROM user WHERE userId = ?', [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        req.session.destroy(err => {
            if (err) return res.status(500).send(err);
            res.send('User account deleted');
        });
    });
});




// 게시글 조회
app.get('/posts', authenticateSession, (req, res) => {
    db.query(`SELECT 
                post.*, 
                user.nickname, 
                user.profile_image,
                (SELECT COUNT(*) FROM comments WHERE postId = post.postId) AS comment_count
            FROM post 
            INNER JOIN user ON post.userId = user.userId`, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});
// 게시글 작성
app.post('/posts', authenticateSession, (req, res) => {
    const { title, content, image } = req.body;
    const userId = req.session.user.userId;
    db.query(
        'INSERT INTO post (userId, title, content, image, likes) VALUES (?, ?, ?, ?, 0)',
        [userId, title, content, image], 
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.send('Post created');
        }
    );
});
// 게시글 상세 조회
app.get('/posts/:id', authenticateSession, (req, res) => {
    const postId = req.params.id;
    // 조회수 증가
    db.query('UPDATE post SET views = views + 1 WHERE postId = ?', [postId], (err, results) => {
        if (err) return res.status(500).send(err);
        db.query(`SELECT 
                    post.*, 
                    user.nickname, 
                    user.profile_image,
                    (SELECT COUNT(*) FROM comments WHERE postId = post.postId) AS comment_count
                FROM post 
                INNER JOIN user ON post.userId = user.userId 
                WHERE postId = ?`, [postId], (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(404).send('Post not found');
            res.json(results[0]);
        });
    });
});
// 게시글 수정
app.put('/posts/:id', authenticateSession, (req, res) => {
    const { title, content, image } = req.body;
    const postId = req.params.id;
    const userId = req.session.user.userId;
    db.query(
        'UPDATE post SET title = ?, content = ?, image = ?, updated = NOW() WHERE postId = ? AND userId = ?',
        [title, content, image, postId, userId],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(403).send('Forbidden');
            res.send('Post updated');
        }
    );
});
// 게시글 삭제
app.delete('/posts/:id', authenticateSession, (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user.userId;
    db.query(
        'DELETE FROM post WHERE postId = ? AND userId = ?',
        [postId, userId],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(403).send('Forbidden');
            res.send('Post deleted');
        }
    );
});


// 댓글 작성
app.post('/posts/:postId/comments', authenticateSession, (req, res) => {
    const postId = req.params.postId;
    const userId = req.session.user.userId;
    const { content } = req.body;
    db.query('INSERT INTO comments (postId, userId, content) VALUES (?, ?, ?)', [postId, userId, content], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Comment added');
    });
});
// 댓글 조회
app.get('/posts/:postId/comments', authenticateSession, (req, res) => {
    const postId = req.params.postId;
    db.query('SELECT comments.*, user.nickname, user.profile_image FROM comments INNER JOIN user ON comments.userId = user.userId WHERE postId = ?', [postId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});
// 댓글 수정
app.put('/comments/:commentId', authenticateSession, (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.session.user.userId;
    const { content } = req.body;
    db.query('UPDATE comments SET content = ? WHERE commentId = ? AND userId = ?', [content, commentId, userId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(403).send('Forbidden');
        res.send('Comment updated');
    });
});
// 댓글 삭제
app.delete('/comments/:commentId', authenticateSession, (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.session.user.userId;
    db.query('DELETE FROM comments WHERE commentId = ? AND userId = ?', [commentId, userId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(403).send('Forbidden');
        res.send('Comment deleted');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
