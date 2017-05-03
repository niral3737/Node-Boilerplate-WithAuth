const express = require('express');
const bodyParser = require('body-parser');

const auth = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
const PORT = 8080;

app.use('/auth', auth);

app.get('/', function (req, res) {
    res.status(200).send('Express app is working');  
});

app.post('/api/login', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);

    const response = {
        payload: {
            token: '123'
        },
        error: ''
    };
    res.status(200).send(response);
});

app.listen(PORT, () => {
    console.log(`🚚 Listning on ${PORT}`);
});