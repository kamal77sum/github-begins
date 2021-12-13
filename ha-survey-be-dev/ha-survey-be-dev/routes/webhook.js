const express = require('express');
const router = express.Router();
const WebHook = require('../models/webhook.model')
const controller = require('../controllers/webhook.controller.js');

router.get('/', (req, res) => {

    console.log("caught in get")
    res.send("cool")
})

router.post('/', async (req, res) => {
    try {

        console.log(req.headers);
        console.log(JSON.stringify(req.body, null, 4))
        let webhook = new WebHook({header:req.headers, data:req.body})
        await webhook.save()
        res.send("cool,cool")
    }
    catch (e) {
        res.status(500).send(e);
    }
});


router.post('/surveycreated',controller.surveyCreated);
router.post('/submittedPage',controller.pageSubmitted);

module.exports = router;

