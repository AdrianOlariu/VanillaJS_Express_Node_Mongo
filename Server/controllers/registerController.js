const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const mongoDB = require('../config/mongoDB');
const sendgrid = require('../config/sendgrid');

//use state
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data;
    }
}

async function register(req, res){
    const {username, password} = req.body; //destructure the variables. In stead of writing req.body.user and req.body.pwd
    if(username && password){
        const duplicate = usersDB.users.find(user => user.username === username);//check if the username already exists in db
        if(!duplicate){
            try{
                const hashedPassword = await bcrypt.hash(password, 10);//we can add salt rounds by adding another parameter, ex: bcrypt.hash(password, 10);
                //store the new user;
                const newUser = {
                    "username":username,
                    //default user role
                    "roles":{"user":1000},
                    "password":hashedPassword
                };
                await mongoDB.db().collection('Users').insertOne(newUser);

                
                usersDB.users.push(newUser);
                sendgrid.sendEmail({
                    to: 'adyyo93@gmail.com',
                    from: 'adrian.olariu93@gmail.com', 
                    subject: `${username} has registered an account on MYBOOKSLIST`,
                    text: `The following user has logged in: ${username}`,
                    html: `<pre>
                    The following user ${username} has a registered account!
                    User details:
                        ${newUser}
                    </pre>`,
                  })();
                  
                await fsPromises.writeFile(
                    path.join(__dirname,'..','model','users.json'),
                    JSON.stringify(usersDB.users)
                )
                
                console.log(usersDB.users);
                res.status(201);
                res.json({"success":`user ${username} created`});

            }catch (err){
                res.status(500);
                res.json({"err":err.message})
            }
    }else{
        res.status(409);
        res.json({"message":"username already exists"});
    }
}else{
    res.status(401);
    res.json({"err":"username and password required"})
}
}

// const test = 
//     {
//     "username":"adrian2",
//     "password":"adrian123"
// }

// usersDB.setUsers(test);
// usersDB.setUsers(test);

// usersDB.users.push(test);

// usersDB.users.push({
//     "username":"adrian1",
//     "password":"adrian123"
// });
// console.log(usersDB.users);

module.exports = {register}
