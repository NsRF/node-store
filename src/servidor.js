import express from 'express'
const app = express()
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from "./routes.js";
import {config} from "dotenv";


config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res)=>{
    res.send("Pàgina inicial da API")});

app.use("/api", router)

//CONECTANDO AO BANCO
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => {
    app.listen(process.env.PORT, function (){
        console.log("Servidor foi inciado na porta: " + process.env.PORT);
    });
}).catch((err) => {
    console.log("Houve um erro ao se conectar com o mongoDB: " + err);
});