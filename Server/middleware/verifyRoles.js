
//PUTEAM PUNE CA SI ARGUMENT ...roles, ceea ce facea ca functia sa accepte un numar nelimitat de argumente
//am pus un singur argument deoarece functia va primi un array returnat de functia allowedRoles - old implementation
//acum array-ul e generat in interiorul functiei.

//detaliere
//exista 3 roluri: USER, EDITOR, ADMIN.
//Functia de mai jos permite returnarea tuturor rolurilor cu autorizatie inferioara
//ex. Pentru operatiun cu autoritatea de user, au acces si rolurile cu autoritatea de editor si admin
//ex. Pentru operatiuni cu autoritatea de editor, au acces si rolurile: admin
//pt operatiuni cu autoritatea de admin are acces doar rolul de admin.


function verifyRoles(roles){
    return (req,res,next) => {
        //acest req.roles este setat in verifyJWT.js
        //username-ul si role-urile sunt encodate in TOKEN
        let allowedRoles = [];
        if(roles === ROLES.USER){
            allowedRoles = [ROLES.USER, ROLES.EDITOR, ROLES.ADMIN];
        }else if(roles === ROLES.EDITOR){
            allowedRoles = [ROLES.ADMIN, ROLES.EDITOR];
        }else if(roles === ROLES.ADMIN){
            allowedRoles = [ROLES.ADMIN];
        }

        const userRoles = Object.values(req.roles);
        console.log(req.user,'has roles:', userRoles);
        const verify = userRoles.map(role => allowedRoles.includes(role)).filter(value => value === true);
        console.log(verify);
        if(verify[0]){
            next();
        }else{
            return res.sendStatus(401);
        }
    }
}

module.exports = verifyRoles;