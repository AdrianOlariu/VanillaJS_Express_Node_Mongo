document.addEventListener('DOMContentLoaded',
UI.displayBooks());
console.log("book app");

let role = '', token = '', username = '';

let btnRolePlaceholder = document.querySelector('#btnRolePlaceholder');
let loggedIn = false;
const books_section = document.querySelector('#booksListContainer');

const authorisationContainer = document.querySelector('#authorisationContainer');
const infoContainer = document.querySelector('#infoContainer');
const usernamePlaceholder = document.querySelector('#usernamePlaceholder');
const rolePlaceholder = document.querySelector('#rolePlaceholder');
// booksContainer.parentNode.removeChild(booksContainer);
const btnLogOut = document.querySelector('#btnLogOut');
const usersContainer = document.querySelector('#usersContainer')

btnRolePlaceholder.addEventListener('click', async (e)=>{
    e.preventDefault();
    UI.showSection(usersContainer);
    apiConnection.getUsers().then((result) => {
        if(result){
            UI.hideSection(books_section);
            UI.showUsers(result);
        }
    }).catch(err =>{
        console.log(err);
    });
})

let loggedInInfos = '';
let apiConnection = new API('');
let myCookie = new Cookie('someCookie','someValue','2');
console.log('my cookie here: ',myCookie.getCookie());

UI.loggedIn(myCookie.getCookie());
if(document.cookie){
    //https://stackoverflow.com/questions/62323246/how-to-stay-logged-in-after-the-browser-is-closed-using-javascript
    //folosim metoda split pentru a taia string-ul continut in document.cookie
    //https://linuxhint.com/cut-string-after-specific-character-in-javascript/#:~:text=There%20is%20another%20JavaScript%20method%20for%20cutting%20a,the%20character%20and%20the%20other%20after%20the%20character.
    username = role = myCookie.getCookieByName('username');
    console.log('#username:',username);
    token = myCookie.getCookieByName('token');
    console.log('#token:',token);
    role = myCookie.getCookieByName('role');
    apiConnection.setBearer(token);
    usernamePlaceholder.innerHTML = username;
    rolePlaceholder.innerHTML = `[${role.toUpperCase()}]`;
    console.log(role);
    UI.setRole(role, apiConnection.getUsers());
}

btnLogOut.addEventListener('click', async (e)=>{
    e.preventDefault();
    console.log('logOut');
    UI.hideSection(usersContainer);
    await apiConnection.logOut();
})

console.log('cookie',document.cookie);

async function refreshToken(){
    myCookie.getCookieByName('token');
    UI.showSection(books_section);
    UI.hideSection(usersContainer);
    console.log('refresh token');
    await apiConnection.refreshToken().then(res => {if(res.newAccessToken){
        myCookie.clearCookie('token');
        myCookie.setCookie('token', res.newAccessToken, 1);
        apiConnection.setBearer(res.newAccessToken)
    }else{
        return new Error("couldn't refresh the token");
    }
    });
}