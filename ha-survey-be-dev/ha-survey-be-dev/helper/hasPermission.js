const { AccessControl } = require('accesscontrol');
const accessControl = require('accesscontrol');

let roleDB =[  { role: 'admin', resource: 'video', action: 'create:any', attributes: '*, !views' },
{ role: 'admin', resource: 'video', action: 'read:any', attributes: '*' },
{ role: 'admin', resource: 'video', action: 'update:any', attributes: '*, !views' },
{ role: 'admin', resource: 'video', action: 'delete:any', attributes: '*' }];
let permissionDB = [         
    { role: 'user',  action: 'create:any', attributes: '*' },
    { role: 'user',  action: 'read:any', attributes: '*' },
]
let groupDB = [
    { role: 'user',  action: 'update:own', attributes: '*' },
    { role: 'user',  action: 'delete:own', attributes: '*' }
]

const hasPermission = (req, res, next,permissionRequired) => {
    console.log(req.body.role)         // lets assume this for once
    const role = req.body?.role;
    try {
      /*  if (!role)
            return res.status(403).json("error");*/
               
            
            const granted = roleCheck(role,roleDB,permissionRequired) |  permissionCheck(role,permissionDB,permissionRequired) | groupCheck(role,groupDB,permissionRequired);
            if (Permission.granted)
                return next();
            
        else
            return res.status(403).json("error");
    }
    catch (err) {
        return res.status(500).json(err.toString());
    }
}

const roleCheck = (role,roleDB,permissionRequired) =>{
    const ac = new AccessControl();

 ac.setGrants(roleDB);
console.log(JSON.stringify(ac.getGrants(),null,4));
return false
}

const permissionCheck = () =>{
return false
}

const groupCheck = () =>{
return false
}

module.exports = hasPermission;