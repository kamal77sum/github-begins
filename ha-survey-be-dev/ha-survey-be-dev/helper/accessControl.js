const AccessControl = require("accesscontrol");

let Permissions = {
admin:{
report:{
    'read:any':['*']
},
user:{
    'create:any':['*'],
    'read:any':['*'],
    'delete:any':['*'],
},
project:{
    'create:any':['*'],
    'update:any':['*']
},
},
operational:{

},
sales:{

},
organization:{

}
}

const defaultAC = new AccessControl(Permissions);



module.exports = defaultAC;