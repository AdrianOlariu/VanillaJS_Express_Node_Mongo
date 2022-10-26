const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const path = require('path');
const {logger, accessControlAllowCredentials} = require('./middleware/middlewareFunctions');
const cors = require('cors');
const corsOptions = require('./config/corsConfig');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

app.use(logger);
app.use(accessControlAllowCredentials);

app.use(cors(corsOptions));

//use static files
app.use('/', express.static(path.join(__dirname,'public')));
app.use('/subdir', express.static(path.join(__dirname,'public')));

//get the route
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));

//api
app.use(cookieParser());//we use this module to parse the cookie that we get in this ex. '/refreshToken' route.
app.use(express.json());//for parsing the json
app.use('/users', require('./routes/api/users'));

app.use('/refreshToken', require('./routes/api/refreshToken'));

app.use(verifyJWT);//to verify the access token for every request on books
app.use('/books', require('./routes/api/books'));


app.get('*',(req,res)=>{
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }else if(req.accepts('json')){
        res.json({'message':'error 404, unknown API Call'})
    }else{
        res.type('txt').send('error 404, unknown API Call');
    }
})

app.listen(port,()=>{
    console.log(`Server running on PORT:`, port);
})