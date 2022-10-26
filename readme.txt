SERVER:  
Address:  htttp://localhost:3500
RUN using VS CODE EXTENSION - THUNDER CLIENT 

CLIENT: 
Address:  http://127.0.0.1:52024
RUN using VS CODE EXTENSION - LIVE SERVER

INFOs
DEV ENVIRONMENT:
  corsConfig.js => corsOptions  ( ADD: || !origin )
  middlewareFunctions.js  => accessControlAllowCredentials (ADD: || !req.headers.origin)
  logOutController.js => logOut ( clearCookie header -> DELETE: {secure:true} )
  logInController.js => logOut ( clearCookie header -> DELETE: {secure:true} )
  
  
 LIVE ENVIRONMENT:
  corsConfig.js => corsOptions  ( DELETE: || !origin )
  middlewareFunctions.js  => accessControlAllowCredentials (DELETE: || !req.headers.origin)
  logOutController.js => logOut ( clearCookie header -> ADD: {secure:true} )
  logInController.js => logOut ( clearCookie header -> ADD: {secure:true} )
