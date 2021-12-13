var fetch = require('node-fetch');
var surveyData = require('../models/webhook.model');
var config = require('config');
const axios = require('axios');

class WebhookController {

    activateWebhook = async (webhookId, headers) => {

        axios.post(`https://api-ap.checkmarket.com/3/hooks/${webhookId}/activate`, {}, { headers: headers })
            .then(res => {
                console.log("activated");
            })
            .catch(err => {
                console.log(err);
            })
    }

    surveyCreated = async (req, res, next) => {

        try {
            console.log("hey")
            let webhookId = req.body?.Data?.WebhookId;
            let headers = {
                "x-hook-key": req.headers[`x-hook-key`],
                "x-master-key": config.get("X-Master-Key-Test-jas"),
                "x-key": config.get("X-Key-Test-jas")
            }

            console.log("survey created ,")
            console.log(req.body)

            if (webhookId) {

                await axios.get(`https://api-ap.checkmarket.com/3/hooks/${webhookId}`,{headers:headers})
                    .then(async res => {
                        console.log(res.data);
                        if (!res.body?.Data?.IsActive) {

                            await this.activateWebhook(webhookId, headers);
                        }
                        await console.log("end");

                    })
                    .catch(err => {
                        console.log(err)
                    });

                    
                    if(req.body?.Data?.Survey)
                    {
                    await axios.get(`https://api-ap.checkmarket.com/3/surveys/${req.body.Data.Survey.Id}`,{headers:headers})
                    .then(async res =>{
                        const survey = new surveyData({
                            surveyId: res.data.Data.Id,
                            x_hook_key: req.headers[`x-hook-key`],
                            data: res.data
                        });

                        await survey.save();
                    })
                    .catch(err =>{
                        console.log(err);
                    })
                    }

            }
            else{
                return res.status(404).json({message:"NOT FOUND"});
            }

        } catch (e) {
            console.log(e)
            res.status(500).send({ success: false, message: "something went wrong." })
        }
    }


    pageSubmitted = (req, res, next) => {
        try {
            const surveyData = new surveyData({
                header: req.headers,
                data: req.body
            });
            surveyData.save(function (err, user) {
                if (err) { return next(err) }
                res.json(user)
            })
        } catch (e) {
            res.status(500).send({ success: false, message: "something went wrong." })
        }
    }
}


module.exports = new WebhookController();

