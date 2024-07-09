const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const port = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
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

app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(uploadRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
