const express = require('express')
const mongoose = require('mongoose')
const user = require('./controllers/user.controller')
const person = require('./controllers/person.controller')
const mysql = require('mysql');

  

  


const Users = require('./models/User')
const bcrypt = require('bcrypt');
const {Auth, isAuthenticated} = require('./controllers/auth.controller')
const app = express()
const port = 3000

const cors = require ('cors');

app.use(cors())
//app.use(express.static(path.join(__dirname + "/public")))

mongoose.connect('mongodb+srv://fender99:Oscuro34@cluster0.vioixrk.mongodb.net/proyectopecera?retryWrites=true&w=majority')


app.use(express.json())

app.get('/users', isAuthenticated, user.list)
app.get('/users', isAuthenticated, user.list)
app.post('/users', isAuthenticated, user.create)
app.put('/users/:id', isAuthenticated, user.update)
app.patch('/users/:id', isAuthenticated, user.update)
app.delete('/users/:id', isAuthenticated, user.destroy)
app.get('/person',  isAuthenticated,person.list)
app.get('/person', isAuthenticated,person.list)
app.post('/login', Auth.login)
app.post('/register', Auth.register)


app.use(express.static('app'))
app.use(express.static('public'))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Tu contraseña
    database: 'Pecera1', // Tu base de datos
});

app.get('*', (req, res) => {
    const query = 'SELECT * FROM sensores';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los registros:', error);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});



app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/charts.html', (req, res) => {
    res.sendFile(`${__dirname}/charts.html`);
});

app.get('/api.js', (req, res) => {
    res.sendFile(`${__dirname}/api.js`);
});

app.get('/User.js',(req, res) =>{
    console.log(__dirname)
    res.sendFile(`${__dirname}/User.js`)
})


app.get('/app/main.js',(req, res) =>{
    console.log(__dirname)
    res.sendFile(`${__dirname}/app/main.js`)
})

app.get('/app/chart.js',(req, res) =>{
    console.log(__dirname)
    res.sendFile(`${__dirname}/app/chart.js`)
})

 

app.get('*', (req, res) => {
    res.status(404);
    res.sendFile(`${__dirname}/notFound.html`);
});




app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});



