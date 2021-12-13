const express = require("express");
const router = express.Router();
const Permission = require('../helper/permissionClass');
const controller = require('../controllers/management.controller');


let roleDB = [{ role: 'admin', resource: 'video', action: 'create:any', attributes: '*, !views' },
{ role: 'admin', resource: 'video', action: 'read:any', attributes: '*' },
{ role: 'admin', resource: 'video', action: 'update:any', attributes: '*, !views' },
{ role: 'admin', resource: 'video', action: 'delete:any', attributes: '*' },
{ role: 'user', resource: 'report', action: 'read:any', attributes: '*' }];


router.get('/', (req, res) => {
    res.status(200).send("pong");
});

router.get('/checkvideo', (req, res, next) => {

    const permission = new Permission('admin', roleDB);
    if (permission.checkRead('video')) {
        console.log("aws")
        res.send("this works");
    }
    else res.status(403).json('forbidden');
});

router.get('/checkreport', (req, res, next) => {
try{
    const permission = new Permission('admin', roleDB);
    if (permission.checkRead('report'))
        res.send("this works");

    else res.status(403).json('forbidden');
}
catch(err){
    res.status(500).json(err.toString());
}
});

router.post('/get/json',controller.getJson);



module.exports = router;