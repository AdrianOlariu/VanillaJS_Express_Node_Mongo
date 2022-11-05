//----------------------------------------------------------MongoDB Set Up
const {MongoClient} = require('mongodb');
// import { MongoClient as mongodb} from 'mongodb'

const uri = "mongodb+srv://adrian:adrian@cluster0.uuwqu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const databaseName = 'BooksListApp';

async function main(){
    await client.connect();
    console.log('connected successfully to server');
    const db = client.db(databaseName);
    const collection = db.collection('Books');
    const insertResult = await collection.insertMany(
        [
            { "title": "The English Patient",
            "author": "Michael Ondaantje" },

    { "title": "Deep Fathom",
    "author": "James Rollins" },

    { "title": "Humiliated and Insulted",
    "author": "Fyodor Dostoevsky" }
]);
    console.log('Inserted documents =>', insertResult);
    return 'done!';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

module.exports = {main};