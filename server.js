const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

/* Para fins de testes estou a usar uma constante que simula um banco de dados */
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
app.use(cors());

bcrypt.hash('12', null, null, function (err, hash) {
    console.log(hash)
});
/* Apresentando usuários*/
app.get('/', (req, res) => {
    (database.users)
        ? res.status(200).json(database.users)
        : res.status(400).json("There's no users to display")
});

/* Registrando usuários */
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

/* Rota para o login dos usuários */
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (email === database.users[0].email && JSON.parse(password) === database.users[0].password) {
        res.json("logged in with success");
    } else {
        res.json("Error logging in");
    }
});

/* buscando o perfil de um usuário pelo id */
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const dados = database.users.filter(user => user.id === JSON.parse(id));
    (dados.length == 1)
        ? res.json(dados)
        : res.status(400).json("User not found")
});

/* Atualizando as entradas de um usuário, isso será necessário quando se conectar ao frontend devido a api de inteligência artificial */
app.put('/image', (req, res) => {
    const { id } = req.body;
    const dados = database.users.filter(user => user.id === JSON.parse(id));
    (dados.length == 1)
        ? res.status(200).json(++dados[0].entries)
        : res.json("Error when trying to update the entries");
});

app.listen(3000);