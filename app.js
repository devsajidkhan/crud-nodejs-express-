const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/userRoutes');
let app = express();
app.use(bodyParser.json());
app.use(router)
let port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});