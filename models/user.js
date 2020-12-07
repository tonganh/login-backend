module.exports = (sequelize, type) => sequelize.define('user', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: type.STRING,
    allowNull: false,
  },
  email: {
    type: type.STRING,
    allowNull: false,
  },
  password: {
    type: type.STRING,
    allowNull: false,

  },
  resetPasswordToken: {
    type: type.STRING,
  },
  resetPasswordExpires: {
    type: type.DATE,
  },
  state: {
    type: type.STRING,

  },
}, {
  tableName: 'Users',
  timestamps: false,
});
