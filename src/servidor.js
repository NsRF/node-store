import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from "./routes.js";
import {config} from "dotenv";
import path from 'path';
const app = express()
const __dirname = path.resolve()

config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './src/public')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./src/public/index.html'));
});

app.use("/api", router)

//CONECTANDO AO BANCO
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => {
    app.listen(process.env.PORT, function (){
        console.log("Servidor foi inciado na porta: " + process.env.PORT);
    });
}).catch((err) => {
    console.log("Houve um erro ao se conectar com o mongoDB: " + err);
});