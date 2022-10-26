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


Useful links:
GIT: https://gitready.com/beginner/2009/01/19/ignoring-files.html#:~:text=Two%20things%20to%20keep%20in%20mind%20with%20ignoring,empty%20directories%20do%20not%20get%20tracked%20by%20Git.
