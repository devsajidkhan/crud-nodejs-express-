const { Op } = require('sequelize');
const { User, bcrypt } = require('../models/users');
const {getRecordFromDatabase} = require('../connection');

exports.createUser = (async (req,res) => {
try {
  let createUser, body, result = "";
    // Validate input using Joi schema
    /*const { error, value } = User.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }*/
  body = req.body;
  createUser = 'create';
  // Create user in database
  // const user = await user.create(value);
  result = await getRecordFromDatabase(User, createUser, body);
    
  res.status(200).json({
    message: "User created successfully!",
    user: result,
  });

} catch (err) {

  res.status(500).json({ error: 'Internal server error' });
}
});

exports.getUser = (async (req,res) => {
try {
  let result, hashedPassword, comparePassword, getUser, user_name, USER= '';
  let {userName, password} = req.query;
  getUser = 'findOne';

  user_name = ({
    where : {userName : {[Op.eq]:userName}}
  })

  result = await getRecordFromDatabase(User, getUser, user_name);

  if ( result ) {
    hashedPassword = result.dataValues.password;
    comparePassword = await bcrypt.compare(password, hashedPassword);
    if (comparePassword) {
      USER = result;
    } else {
      USER = 'incorrect password or userName';
    }
  } else {
    USER = 'userName not found';
  }

  res.status(200).setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(USER));

} catch (err) {
  res.status(500).json({ error: 'Internal server error' });
}
});