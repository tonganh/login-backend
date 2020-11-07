const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// const nodemailer = require('nodemailer');
const { withJWTAuthMiddleware } = require('express-kun');
const login = require('./routes/loginroutes');
require('dotenv').config();

const router = express.Router();
const protectRouter = withJWTAuthMiddleware(router, 'yourSecretKey');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.post('/register', login.register);
router.post('/forgot', login.forgot);
router.post('/reset/:token', login.reset);
protectRouter.get('/', login.getAll);
router.post('/login', login.login);
protectRouter.get('/:id', login.get);

// router.post('/forgot-password',)
app.use('/api', router);
app.listen(4000);
