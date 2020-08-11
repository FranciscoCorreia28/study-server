const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
// app.get('/', (req, res) => {
//     res.send("getting root")
// });

// app.get('/profile', (req, res) => {
//     res.send("getting the profile")
// })

// app.post('/profile', (req, res) => {

//     res.send("success")
//     console.log(req.body)
// });
app.listen(3000)