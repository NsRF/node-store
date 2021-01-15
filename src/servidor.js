const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res)=>{
    res.send("Pàgina inicial da API")});

require('../src/routes')(app);

//CONECTANDO AO BANCO
mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(() => {
    app.listen(3000, function (){
        console.log('Servidor foi inciado na porta 3000');
    });
}).catch((err) => {
    console.log("Houve um erro ao se conectar com o mongoDB: " + err);
});