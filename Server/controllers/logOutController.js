const fsPromises = require('fs').promises;
const path = require('path');
const DB = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data;
    }
};

async function logOut(req, res){

    //-------------------------WARNING: TO ADD VERIFICATIONS
    const cookie = req.cookies;
    if(cookie.jwt){
        console.log('cookie here:', req.cookies);
        const foundUser = DB.users.find(user => user.refreshToken === cookie.jwt);
        console.log("FOUND USER: ",foundUser);
        const otherUsers = DB.users.filter(user => user.refreshToken !== foundUser.refreshToken);
        foundUser.refreshToken = '';
        DB.setUsers([...otherUsers, foundUser]);
        //STERGEM COOKIE-ul
        res.clearCookie('jwt', {httpOnly: true, sameSite:'None', secure:true});
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(DB.users)
            )
        res.status(200).json({"success":"log out properly"});
    }else{
        res.status(403).json({"error":"couldn't log out properly"});
    }
}

module.exports = {logOut};