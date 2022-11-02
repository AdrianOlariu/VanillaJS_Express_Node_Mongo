const inputFields = document.querySelector('#inputFields');
const btnLogIn = document.querySelector('#btnLogIn');
const btnSignUp = document.querySelector('#btnSignUp');
const confirmPassword = document.createElement('div');


btnSignUp.addEventListener('click', async (err)=>{
    UI.signUpForm();
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.addEventListener('click', async (e) =>{

        e.preventDefault();
        console.log("register");
        registerStatus = await API.register().then(result => result);
        console.log(registerStatus.success);
        if(registerStatus.success){
            UI.showAlert(registerStatus.success,'success');
        }else{
            UI.showAlert('user has not been created','danger');
        }
        UI.logInForm();
    })
})

btnLogIn.addEventListener('click', async (e) =>{
    e.preventDefault();
    const username = document.querySelector('#user').value;
    if(!username || !document.querySelector('#pass').value){
        UI.showAlert('Insert Username and Password', 'warning');
        console.log('insert correct value');
    }else{
        console.log("log in");
        loggedInInfos = await API.logIn().then(result => {
        myCookie.setCookie('username', username, 1);
        myCookie.setCookie('token', result.accessToken, 0, 1);
        myCookie.setCookie('role', result.role, 1);
        // usernamePlaceholder.innerHTML = username;
        rolePlaceholder.innerHTML = `[${result.role.toUpperCase()}]`;

        UI.setRole(result.role);

        return result});
        // console.log(loggedInInfos)
        console.log(loggedInInfos.accessToken);
        UI.loggedIn(loggedInInfos.accessToken, myCookie.getCookie());

        apiConnection.setBearer(loggedInInfos.accessToken);
        console.log('bearer',apiConnection.getBearer());
        
        usernamePlaceholder.innerHTML = username;
            
        console.log(username);
        
        // myCookie.setCookie('username', username, 1);
        // myCookie.setCookie('role', loggedInInfos.role, 1);
        // myCookie.setCookie('token', loggedInInfos.accessToken, 1);

        UI.showAlert(`Welcome, ${username}`,'info');
        loggedIn = true;
        // UI.animationHeader('When the authentication token expires, refresh it by clicking the book icon!', animationPlayed, allowedPlayableAnimations);
        // animationPlayed += 1;
    }

    // authorisationContainer.remove();
})