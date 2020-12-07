const Sequelize = require('sequelize');
// const UserModel = require('./models/user');

const sequelize = new Sequelize('login', 'root', 'lovehangga', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

const User = sequelize.define('User',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    resetPasswordToken: {
      type: Sequelize.STRING,
    },
    resetPasswordExpires: {
      type: Sequelize.DATE,
    },
    state: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'Users',
    timestamps: false,
  });

const Post = sequelize.define('Posts',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cateID: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: 'Posts',
    timestamps: false,
  });
// const Post = UserModel.Post(sequelize, Sequelize);

// User.hasMany(Post);
// Post.belongsTo(User);
// Post.hasOne(User);
sequelize.sync().then(() => {
  console.log('User db and user table have been created');
});

module.exports = { User, Post };
