const logEvent = require('./logEvents');
const origins = require('../config/origins');

function logger (req,res,next) {
    logEvent(`Method:${req.method}\tURL:${req.url}\t${req.headers.origin}`,'reqLog.txt');
    next();
}

function accessControlAllowCredentials(req,res,next){
    //DEV:          PUT !req.headers.origin
    //PRODUCTION:   REMOVE !req.headers.origin
    if(origins.indexOf(req.headers.origin) !== -1 || !req.headers.origin){
        console.log('Allowed origin:', req.headers.origin);
        res.header('Access-Control-Allow-Credentials', true);
        next();
    }else{
        console.log('UNAUTHORIZED ORIGIN:', req.headers.origin);
        res.json({'Access Controll Allow Credentials':'not allowed by cors'});
    }
}

module.exports = {logger, accessControlAllowCredentials};