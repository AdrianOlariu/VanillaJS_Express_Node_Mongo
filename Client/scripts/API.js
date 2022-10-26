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
                    console.log('caught error',err);
                }
        }else{
            console.log('User and Password required');
            return false;
        }
    }

    static async register(){
        const user = document.querySelector('#user').value;
        const pass = document.querySelector('#pass').value;
        console.log(user, pass);
        if(user !== '' && pass !== ''){
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
                document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                UI.loggedIn(false);
                return await response.json();
            }else{
                throw new Error(`${response.status} ${response.statusText}`);
            }
        }catch (err){
            console.log('caught error',err);
        }
}
}