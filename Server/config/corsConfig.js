
const whitelist = require('./origins')

const corsOptions = {
    origin: function (origin, callback) {
      //DEV:          ADD the ( !origin ) because on DEV Env the ORIGIN is NULL
      //PRODUCTION:   REMOVE the ( !origin ).
        if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  

  module.exports = corsOptions;