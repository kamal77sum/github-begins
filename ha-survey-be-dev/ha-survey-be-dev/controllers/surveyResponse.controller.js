var fetch = require('node-fetch');
var responseData = require('../models/surveyResponse.model');
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

    surveySubmit = async (req, res, next) => {
        try {
            let webhookId = req.body?.Data?.WebhookId;
            let headers = {
                "x-hook-key": req.headers[`x-hook-key`],
                "x-master-key": config.get("X-Master-Key-Test-jas"),
                "x-key": config.get("X-Key-Test-jas")
            }

            

            if (webhookId) {

                await axios.get(`https://api-ap.checkmarket.com/3/hooks/${webhookId}`,{headers:headers})
                    .then(async res => {
                        console.log(res.data?.Data?.IsActive);
                        
                        if (!res.data?.Data?.IsActive) {

                            await this.activateWebhook(webhookId, headers);
                        }
                        else{
                            console.log("saving data");
                            const data = {...req.body.Data};
                            const response = new responseData({
                                surveyId: data.SurveyId,
                                respondentData: {...data.Respondent}
                            });
                            console.log(data.surveyId)
                            await response.save();
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    });

                    /*
                    if(req.body?.Data?.Survey)
                    {a
                    await axios.get(`https://api-ap.checkmarket.com/3/surveys/${req.body.Data.Survey.Id}`,{headers:headers})
                    .then(async res =>{
                        const survey = new surveyData({
                            x_hook_key: req.headers[`x-hook-key`],
                            data: res.data
                        });

                        await survey.save();
                    })
                    .catch(err =>{
                        console.log(err);
                    })
                    }
                    */

            }

        } catch (e) {
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

