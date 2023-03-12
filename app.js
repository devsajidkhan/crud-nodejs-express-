const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/users')
const {db, getRecordFromDatabase} = require('./connection')
require('dotenv').config();

let app = express();
let port = 3000;
app.use(bodyParser.json());
app.post('/signup', async (req,res) => {
    try {
        // Validate input using Joi schema
        /*const { error, value } = User.validate(req.body);
        if (error) {
          throw new Error(error.details[0].message);
        }*/
        let createUser = 'create';
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
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});