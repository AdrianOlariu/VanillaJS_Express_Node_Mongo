const path = require('path');
const fsPromises = require('fs').promises;
let users = require('../model/users.json');
const bcrypt = require('bcrypt');

function getAllUsers(req, res){
        const parsedUsers = users.map(user => (
            {
                ...user,
                roles: Object.getOwnPropertyNames(user.roles).map(role => role)
            }));
            //am suprascris valoarea proprietatii: roles.
            //trimitem doar numele rolului, nu si codul.
        console.log(parsedUsers);
        res.json(parsedUsers);
}

async function deleteUser(req,res){
    console.log(req.user);
    let {username} = req.body;
    const foundUser = users.find(user => user.username === username );
    if(foundUser){
        
        const otherUsers = users.filter(user => user.username !== foundUser.username);
        
        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'), JSON.stringify(otherUsers));

        res.json({"Success":`${foundUser.username} been deleted`});
    }else{
        res.json({"Not completed":`${username} is not in the list`});
    }
}


async function updateUser(req, res){
    console.log('update user');
    if(req.body.password || req.body.role){
        const foundUser = users.find(user => user.username === req.body.username);
        const otherUsers = users.filter(user => user.username !== foundUser.username);
        console.log(users);
        console.log(foundUser);
        console.log(otherUsers);
        if(req.body.password){
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            console.log('new hashedpass',hashedPass);
            foundUser.password = hashedPass;
        }
        if(req.body.role){ 
            if(req.body.role === 'user'){
                foundUser.roles = {};
                foundUser.roles.user = 1000;
            }else if(req.body.role === 'editor'){
                foundUser.roles = {};
                foundUser.roles.user = 1000;
                foundUser.roles.editor = 2000;
            }else if(req.body.role === 'admin'){
                foundUser.roles = {};
                foundUser.roles.user = 1000;
                foundUser.roles.editor = 2000;
                foundUser.roles.admin = 4000;
            }
            console.log('role updated?',foundUser);
        }
        otherUsers.push(foundUser);
        users = otherUsers;
        console.log(users);
        res.sendStatus(201);

        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(users));
    }
    console.log(req.body.username);
    console.log(req.body.role);
}

module.exports = {deleteUser, getAllUsers, updateUser};