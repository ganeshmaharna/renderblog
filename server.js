import express from 'express';
import dotenv from 'dotenv';        
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Connection from './database/db.js';
import Router from './routes/route.js';//here we import all the router 
// The dotenv is a zero-dependency module that loads environment variables from a . env file into process. env
//It used to initialize the dotenv file
dotenv.config();

const app = express();
//this is to prevent browser cor error
app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/',Router);//here we use the router
mongoose.set('strictQuery', false);
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is started on the PORT ${PORT}`);
});
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
const URL=process.env.MONGO_URI || `mongodb://${USERNAME}:${PASSWORD}@ac-aqozdhd-shard-00-00.hnuvxv0.mongodb.net:27017,ac-aqozdhd-shard-00-01.hnuvxv0.mongodb.net:27017,ac-aqozdhd-shard-00-02.hnuvxv0.mongodb.net:27017/?ssl=true&replicaSet=atlas-sap4ux-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);