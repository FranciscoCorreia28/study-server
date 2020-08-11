const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('express');
const database = {
    users: [
        {
            id: 123,
            name: "Francisco Correia",
            email: "francisco@gmail.com",
            password: 123,
            entries: 0,
            joined: new Date() // nota: a data não virá formata.
        }
    ]
}

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    (database.users)
        ? res.status(200).json(database.users)
        : res.status(400).json("There's no users to display")
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    try {
        database.users.push({
            id: 124,
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        });
        res.json("new user");
    } catch (error) {
        res.json(error);
    }

});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (email === database.users[0].email && JSON.parse(password) === database.users[0].password) {
        res.json("logged in with success");
    } else {
        res.json("Error logging in");
    }
});

app.listen(3000);