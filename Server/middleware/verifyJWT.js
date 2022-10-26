
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    //the JWT Token is in req.headers.authorization - websites use 'Authorizations' or 'authorization'
    const authHeader = (req.headers['authorization'] || req.headers.Authorization);
    console.log('Authorization header:',authHeader);

    const token = authHeader.split(" ")[1];//create two elements in the arry, and select the element with index 1, so only the token.

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
        if(!err){
            req.user = decoded.username;
            console.log('authorised for',req.user);
            // ERROR - we cannot send two responses to the client
            //https://stackoverflow.com/questions/52122272/err-http-headers-sent-cannot-set-headers-after-they-are-sent-to-the-client
            // res.json({"access":"granted!"});
            next();
        }else{
            res.json({'err verifying JWT':err.message});
        }
    })
}

module.exports = verifyJWT;