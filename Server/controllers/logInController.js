const bcrypt = require('bcrypt');
const usersDB = {
    users: require('../model/users.json')
}

require('dotenv').config();//cause we don't want to store it. We just keep it in memory.
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

async function logIn(req, res){
    const {username, password} = req.body;
    if(username && password){
        const foundUser = usersDB.users.find(user => user.username === username);
        if(foundUser){
            try{
                const passMatch = await bcrypt.compare(password, foundUser.password);

                if(passMatch){

                    //-------------------------------------ACCESS_TOKEN
                    //in acest access token, encodam username-ul si rolurile
                    const accessToken = jwt.sign(
                        
                        {
                        "username":foundUser.username,
                        "roles":foundUser.roles
                        },

                        process.env.ACCESS_TOKEN_SECRET,

                        {"expiresIn":'15m'}

                    )

                    //-------------------------------------REFRESH_TOKEN - > USED TO RENEW THE ACCESS TOKEN
                    const refreshToken = jwt.sign(
                        {"username":foundUser.username},
                        process.env.REFRESH_TOKEN_SECRET,
                        {"expiresIn":'1d'}
                    )

                    //filtram userii din baza de date inafara de cel curent
                    const otherUsers = usersDB.users.filter((user) => user.username !== username);

                    // SPREAD OPERATOR: https://oprearocks.medium.com/what-do-the-three-dots-mean-in-javascript-bc5749439c9a
                    //folosind spread operator-ul ... , generam obiectul currentUser care detine refreshToken-ul, 
                    const currentUser = {...foundUser, refreshToken};
                    
                    console.log('current user:', currentUser);
                    //acelasi lucru cu a-l genera folisnd metoda de mai jos
                    /*
                    const currentUser = {
                        username:foundUser.username,
                        password:foundUser.password,
                        refreshToken:refreshToken
                    }*/
                    //recreem obiectul initial folosind userii care nu-l au pe user-ul curent iar apoi il adaugam pe userul curent creat cu tot cu token
                    let updatedUsersList = {
                        users:otherUsers,
                        setUsers(data){
                            this.users = data;
                        }
                    };
                    updatedUsersList.setUsers([...otherUsers, currentUser]);

                    //acelasi lucru doar ca folosind mai multi pasi
                    /*otherUsers.push(currentUser);
                    const updatedUsersList = otherUsers;
                    */

                    //Salvam REFRESH_TOKEN-ul in DB / FISIER, adaugand-ul la user-ul care s-a logat
                    await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(updatedUsersList.users));

                    //Trimitem REFRESH_TOKEN-ul catre client(FRONT) print HTTP, intr-un COOKIE care e HTTP_ONLY, pentru a nu putea fi accesat
                    //de javascript sau prin alte metode 
                    //https://www.geeksforgeeks.org/http-cookies-in-node-js/
                    //---------------DEV:           res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', maxAge: 24 * 60 * 60 * 1000});
                    //---------------PRODUCTION:    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', secure:true, maxAge: 24 * 60 * 60 * 1000});
                    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', secure:true, maxAge: 24 * 60 * 60 * 1000});
                    //trimitem accessToken-ul intr-un JSON
                    //trimitem in roles, nivelul de autoritate al userului
                    res.json({
                        "accessToken": accessToken, 
                        //selectam pe baza valorii cele mai mari numele proprietatii cu acea valoare si o trimitem la client
                        "role": Object.getOwnPropertyNames(foundUser.roles)[Object.values(foundUser.roles).indexOf(Math.max(...Object.values(foundUser.roles)))]
                        });
                        console.log(Object.getOwnPropertyNames(foundUser.roles)[Object.values(foundUser.roles).indexOf(Math.max(...Object.values(foundUser.roles)))]);
                }else{
                    res.status(409);
                    res.json({"message":"incorrect password"});
                }
            }catch (err){
                res.status(500);
                res.json({"err":err.message})
            }
        }else{
            res.status(409);
            res.json({"error":"username does not exist"});
        }
    }else{
        res.status(409);
        res.json({"error":"username and password required for log in"});
    }
}

module.exports = {logIn}