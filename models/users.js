const {sequelize, DataTypes} = require('sequelize');
const{db} = require('../connection')
const bcrypt = require('bcrypt')

// Define User model
const User = db.define('testuser', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [5, 15],
      },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            len: [4, 15],
        },
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
              args: [3, 255],
              msg: 'Name must be between 3 and 255 characters',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
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
    hooks: {
        type: DataTypes.STRING,
        beforeCreate: async (User) => {
        // Hash the password before storing it
            const salt = await bcrypt.genSalt(10);
            User.password = await bcrypt.hash(User.password, salt);
        },
    }, 
});
User.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

module.exports = User;