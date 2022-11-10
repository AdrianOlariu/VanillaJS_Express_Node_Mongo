const UsersSchemaCommand = {
    "collMod": "Users",
    "validator": {
        $jsonSchema: {
            "bsonType": "object",
            "description": "Document describing a book",
            "required": ["username", "password", "roles"],
            "properties": {
                "username": {
                    "bsonType": "string",
                    "description": "username of the person"
                },
                "password": {
                    "bsonType": "string",
                    "description": "hasehd password is required"
                },
                "roles": {
                    "bsonType": "object",
                    "description": "Roles must be an array of strings",
                    "minItems": 1,
                    "uniqueItems": true,
                }
            },
        }
    }
}

module.exports = {UsersSchemaCommand}