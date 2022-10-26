class Cookie {
    constructor(cookie){
        this.cookie = cookie;
    }

    setCookie(cname, cvalue, hours){
            const d = new Date();
            d.setTime(d.getTime() + (hours*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";";
    }

    getCookie(){
        return document.cookie;
    }
}