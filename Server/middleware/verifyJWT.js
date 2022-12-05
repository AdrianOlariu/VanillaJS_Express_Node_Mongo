
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    //the JWT Token is in req.headers.authorization - websites use 'Authorizations' or 'authorization'
   

    const authHeader = (req.headers['authorization'] || req.headers.Authorization);
   if(authHeader){
	 console.log('Authorization header:',authHeader);
    // const roles = req.headers.roles;
    // console.log(roles);
    const token = authHeader.split(" ")[1];//create two elements in the arry, and select the element with index 1, so only the token.

    //Pe baza token-ului decodam username-ul. Practic il luam din token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
        if(!err){
            //decodam username-ul si rol-urile si le bagam in req ca sa le trimitem mai departe
            req.user = decoded.username;
            req.roles = decoded.roles;
            console.log('authorised for:', req.user);
            // ERROR - we cannot send two responses to the client
            //https://stackoverflow.com/questions/52122272/err-http-headers-sent-cannot-set-headers-after-they-are-sent-to-the-client
            // res.json({"access":"granted!"});
            next();
        }else{
            res.json({'err verifying JWT':err.message});
        }
    })
	}else{
	res.status(403).json({"unauthorized":"authorization header not present"});
	}
}

module.exports = verifyJWT;
