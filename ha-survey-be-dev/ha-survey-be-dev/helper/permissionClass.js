const accessControl = require("accesscontrol");
class Permission{
    
    constructor(role,grantList){   // role is the role of the current user  
        // grantList is the permission from the DB granted to that user
        //resourceRequired is specific to the APIs 
        // we will need the current role of the user, the resource he needs access to and the type of permission
        this.role = role;
       this.grantList = grantList;
        
    }

    checkRead(resourceRequired){
        try{
            let ac = new accessControl(this.grantList);
            const permission = ac.can(this.role).readAny(resourceRequired);
            
            if(permission.granted){
                return true
            }
            return false;
        }catch(e){
            return false;
        }
     
    }

    checkCreate(resourceRequired){
        try{
            let ac = new accessControl(this.grantList);
            const permission = ac.can(this.role).createAny(resourceRequired);
            console.log(permission)
            if(permission.granted){
                return true
            }
            return false;
        }
        catch(e){
            return false
        }
        
    }

    checkUpdate(resourceRequired){
        try{
            let ac = new accessControl(this.grantList);
            const permission = ac.can(this.role).UpdateAny(resourceRequired);
            console.log(permission)
            if(permission.granted){
                return true
            }
            return false;
        }
        catch(e){
            return false
        }
        
    }




}
module.exports = Permission;