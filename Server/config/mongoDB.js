//----------------------------------------------------------MongoDB Set Up
//https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module - last post!
require('dotenv').config();
const {MongoClient, ServerApiVersion} = require('mongodb');

const client = new MongoClient(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true, serverApi:ServerApiVersion.v1})
const db = () => client.db(process.env.DATABASE_NAME);
console.log(process.env.DATABASE_URI);

const openConnection = (callback) => {
    try{
        client.connect().then(callback);
        console.log('Connected to db!');
    }catch(err){
        closeConnection();
        throw err;
    }
}

const closeConnection = () =>{
    client.close();
    console.log('connection closed!')
}


// closeConnection();


// main();
module.exports = {client, db, closeConnection, openConnection};









