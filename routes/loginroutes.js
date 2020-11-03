// import User from '../sequelize';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const User = require('../sequelize');
require('dotenv').config();

const saltRounds = 10;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lovehangga',
  database: 'login',
});
connection.connect((err) => {
  if (!err) {
    // eslint-disable-next-line no-console
    console.log('Database is connected ... nn');
  } else {
    // eslint-disable-next-line no-console
    console.log(err, 'Error connecting database ... nn', err);
  }
});
exports.register = async (req, res) => {
  const { password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const users = {
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
  };
  if (req.body.email === '') {
    res.status(400).send('Email required');
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user == null) {
      User.create({
        username: users.username,
        email: users.email,
        password: users.password,
      }).then(() => {
        res.status(400).send('Yeah');
      });
    } else {
      res.status(404).send('Not existed in database');
    }
  });
};
// eslint-disable-next-line func-names
exports.login = async function (req, res) {
  const userLogin = {
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.findOne({
    where: {
      email: userLogin.email,
    },
  });
  if (user == null) {
    res.status(404).send('Email not in database.');
  } else {
    const comparision = await bcrypt.compare(userLogin.password, user.password);
    if (comparision) {
      res.status(400).send('Login successfull.');
    } else {
      res.status(404).send('Password is not incorrect.');
    }
  }
};
exports.forgot = async function forgot(req, res) {
  if (req.body.email === '') {
    res.status(400).send('Email required');
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user === null) {
    // eslint-disable-next-line no-console
      console.error('Email not in database');
      res.status(403).send('Email not in database');
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        resertPasswordExpires: Date.now() + 360000,
      });
      const mailHost = 'smtp.gmail.com';
      const mailPort = 587;
      const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: mailHost,
        port: mailPort,
        secure: false,
        // port: 4000,
        auth: {
          // type: 'OAuth2',
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
          // clientId: `${process.env.clientID}`,
          // clientSecret: `${process.env.clientSecret}`,
        },
      });
      const mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${user.email}`,
        subject: 'Link to Reset',
        text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3031/reset/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error('There was an error', err);
        } else {
          // eslint-disable-next-line no-console
          console.log('here is the res', response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  });
};
