const Sequelize = require('sequelize');
const UserModel = require('./models/user');

const sequelize = new Sequelize('login', 'root', 'lovehangga', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log('User db and user table have been created');
});

module.exports = User;
