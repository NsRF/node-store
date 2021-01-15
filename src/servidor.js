const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res)=>{
    res.send("Pàgina inicial da API")});

require('../src/routes')(app);

//CONECTANDO AO BANCO
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => {
    app.listen(process.env.PORT, function (){
        console.log("Servidor foi inciado na porta: " + process.env.PORT);
    });
}).catch((err) => {
    console.log("Houve um erro ao se conectar com o mongoDB: " + err);
});