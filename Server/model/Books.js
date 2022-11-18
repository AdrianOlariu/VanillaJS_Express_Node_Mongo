//https://www.digitalocean.com/community/tutorials/how-to-use-schema-validation-in-mongodb

const BookSchemaCommand = {
    "collMod": "Books",
    "validator": {
        $jsonSchema: {
            "bsonType": "object",
            "description": "Document describing a book",
            "required": ["title", "author", "year"],
            "properties": {
                "title": {
                    "bsonType": "string",
                    "description": "Title must be a string and is required"
                },
                "author": {
                    "bsonType": "string",
                    "description": "Height must be a number and is required"
                },
                "year": {
                    "bsonType": "number",
                    "description": "year must be a number and is required"
                },
                "read_status": {
                    "bsonType": "string",
                    "description": "have you read this book?"
                }
            },
        }
    }
}

//Schema can be bypassed by adding something through a command with 
//{ insert: <collection_name>, documents: [document1,document2], bypassDocumentValidation: true }
const command = {
    insert: "Books",
    documents: [
       {
          name: "Alice",
          year: 2016,
          major: "History",
          gpa: 3.0,
          address: {
             city: "NYC",
             street: "33rd Street"
          }
       }
    ],
    bypassDocumentValidation: true
 }

module.exports = {BookSchemaCommand, command}