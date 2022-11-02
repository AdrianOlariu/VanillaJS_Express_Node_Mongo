class API{

    constructor(bearer){
        this.bearer = bearer;
    }

    getBearer(){
        return this.bearer;
    }

    setBearer(bearer){
        this.bearer = bearer;
    }

    static async logIn(){
        const user = document.querySelector('#user').value;
        const pass = document.querySelector('#pass').value;
        console.log(user, pass);
        if(user !== '' && pass !== ''){
                console.log('async function');
                try{
                    console.log('try async function')
                    const response = await fetch(
                        'http://localhost:3500/users/login',{
                            method: 'POST',
                            headers: {'Content-Type':'application/json'},
                            credentials: 'include',
                            body: JSON.stringify({username:user, password:pass})
                        }
                    )
    
                    if(response.ok){
                        return await response.json();
                    }else{
                        throw new Error(`${response.status} ${response.statusText}`);
                    }
                }catch (err){
                    UI.showAlert('Username or Password wrogn', 'danger');
                    console.log('error caught here:',err);
                }
        }else{
            console.log('User and Password required');
            return false;
        }
    }

    static async register(){
        const user = document.querySelector('#user').value;
        const pass = document.querySelector('#pass').value;
        const confirmPass = document.querySelector('#confirmPass').value;
        console.log(user, pass, confirmPass);
        if(user !== '' && pass !== '' && (pass === confirmPass)){
                console.log('async function');
                try{
                    console.log('try async function')
                    const response = await fetch(
                        'http://localhost:3500/users/register',{
                            method: 'POST',
                            headers: {'Content-Type':'application/json'},
                            credentials: 'include',
                            body: JSON.stringify({username:user, password:pass})
                        }
                    )
    
                    if(response.ok){
                        UI.showAlert(`User ${user} created successfully`,'info');
                        return await response.json();
                    }else{
                        throw new Error(`${response.status} ${response.statusText}`);
                    }
                }catch (err){
                    console.log('caught error',err);
                }
        }else{
            console.log('User and Password required');
            return false;
        }
    }

    async books(url, method, accessToken){
                //https://internationaltradeadministration.github.io/DevPortalMessages/IntroToNewAuthType.html
                let finalUrl = 'http://localhost:3500/books';
                const token = 'Bearer ' + this.bearer;
                console.log('async function');
                console.log(`${finalUrl}`);
                    console.log(token);
                try{
                    
                    const response = await fetch(
                        finalUrl,{
                            method: method,
                            headers: {
                                'Authorization': token
                            }
                        }
                    )
    
                    if(response.ok){
                        return await response.json();
                    }else{
                        throw new Error(`${response.status} ${response.statusText}`);
                    }
                }catch (err){
                    console.log('caught error',err);
                }
    }

    async refreshToken(){
                try{
                    const response = await fetch('http://localhost:3500/refreshtoken',
                    {
                            method: 'GET',
                            credentials: 'include'
                            // headers: {
                            //     'Authorization': token
                            // }
                            //cookie-ul este pus automat in header. La server luam cookie.jwt
                        }
                    )
    
                    if(response.ok){
                        return await response.json();
                    }else{
                        throw new Error(`${response.status} ${response.statusText}`);
                    }
                }catch (err){
                    console.log('caught error',err);
                }
    }

    async logOut(){
        try{
            const response = await fetch('http://localhost:3500/users/logout',
            {
                    method: 'GET',
                    credentials: 'include'
                    // headers: {
                    //     'Authorization': token
                    // }
                    //cookie-ul este pus automat in header. La server luam cookie.jwt
                }
            )

            if(response.ok){
                Cookie.clearCookie("username");
                Cookie.clearCookie("token");
                Cookie.clearCookie("jwt");
                Cookie.clearCookie("role");
                UI.loggedIn(false);
                return await response.json();
            }else{
                throw new Error(`${response.status} ${response.statusText}`);
            }
        }catch (err){
            console.log('caught error',err);
        }
    }

    async getUsers(){
        
        try{
            const response = await fetch('http://localhost:3500/users',{
                method:'GET',
                headers: {
                    Authorization: 'Bearer ' + this.bearer
                }
            });
            return await response.json();
        }catch(err){
            console.log(err);
        }
    }

    async deleteUser(userName){
        console.log(userName);
        try{
            const response = await fetch(
                'http://localhost:3500/users/',
                {
                    method:'DELETE',
                    headers: {
                        'Content-Type':'application/json',
                        Authorization: 'Bearer ' + this.bearer
                        },
                    body: JSON.stringify({username:userName})
                }
            )
            return await response.json();
        }catch (err){
            console.log(err);
        }
    }
}