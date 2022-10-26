const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');
const {v4:uuid} = require('uuid');

function generateParameters(message){
    return `${format(new Date(),'hh:mm:ss\tdd:MM:yyyy')}\t${uuid()}\t${message}\n`;
}

async function logEvent(message, fileName){
    if(!fs.existsSync(path.join(__dirname,'..', 'Logs'))){
        fs.mkdir(path.join(__dirname,'..', 'Logs'),(err) =>{ if(err) {throw err;}});
    }
    await fsPromises.appendFile(path.join(__dirname,'..','Logs', fileName), generateParameters(message));
}

module.exports = logEvent;

