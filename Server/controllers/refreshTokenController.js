const jwt = require('jsonwebtoken');
require('dotenv').config();

//STATE USE APPROACH
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data;
    }
}

function refreshToken(req, res, next){
    const cookies = req.cookies; //pentru ca stim ca primim intr-un cookie refresh token-ul
    if(cookies?.jwt){//daca exista cookie si daca acel cookie are proprietatea jwt
        
        console.log(cookies.jwt);
        const refreshToken = cookies.jwt;//luam refresh token-ul din cookie
        
        const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);//cautam user-ul care are acel refresh token, ca sa fim sigur
        console.log(foundUser);
        if(foundUser){ //daca s-a gasit un user cu acel refresh token
            jwt.verify( //verificam refresh token-ul din cookie pentr a crea un nou access token
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if(!err && foundUser.username === decoded.username){//verificam si username-ul sa fim siguri
                        const newAccessToken = jwt.sign(//creem un nou acess token
                            {
                            "username":foundUser.username,
                            "roles":foundUser.roles
                            },
                            process.env.ACCESS_TOKEN_SECRET,
                            {expiresIn: '5m'}
                        );
                        res.json({newAccessToken});//trimitem acest access token catre client / front end
                    }else{
                        res.sendStatus(403);
                    }
                }
            );
        }else{
            res.sendStatus(403);
        }
    }else{
        res.sendStatus(401);
    }
}

module.exports = refreshToken;