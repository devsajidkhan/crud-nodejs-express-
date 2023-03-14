const {sequelize, DataTypes} = require('sequelize');
const{db} = require('../connection')
const bcrypt = require('bcrypt')

// Define User model
const User = db.define('users', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      len: [5, 15],
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      len: [4, 15],
    }
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        rgs: [3, 255],
        msg: 'Name must be between 3 and 255 characters',
      },
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  CountryCode : {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      len: [2, 10],
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      len: [3, 15],
    }
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      len: [3, 15],
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 255], // length must be between 6 and 255 characters
      isStrongPassword: function (value) {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(value)) {
          throw new Error('The password must be at least 6 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character.');
        }
      }
    }
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    validate: {
      len: [3, 15],
    }
  }
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

module.exports = {User, bcrypt};