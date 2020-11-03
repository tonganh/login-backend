const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
const login = require('./routes/loginroutes');
require('dotenv').config();

const app = express();
// const nodemailer = require('nodemailer');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();
// test route
router.get('/', (req, res) => {
  res.json({ message: 'welcome to our upload module apis' });
});
// route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login);
router.post('/forgot', login.forgot);
// router.post('/forgot-password',)
app.use('/api', router);
app.listen(4000);
