const User = require('../models/users');
const {getRecordFromDatabase} = require('../connection');

exports.createUser = (async (req,res) => {
    try {
        // Validate input using Joi schema
        /*const { error, value } = User.validate(req.body);
        if (error) {
          throw new Error(error.details[0].message);
        }*/
        let createUser = 'create';
        console.log(createUser)
        console.log(req.body)
        // Create user in database
        // const user = await user.create(value);
        let result = await getRecordFromDatabase(User, createUser, req.body);
        res.status(200).json({
            message: "User created successfully!",
            user: result,
          });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
})