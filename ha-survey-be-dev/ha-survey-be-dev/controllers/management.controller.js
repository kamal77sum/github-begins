const user = require('../models/user.model');
const project = require('../models/project.model');
const helper = require('../helper/helper.functions');
var permissionClass = require('../helper/permissionClass');
const generateToken = require('../middleware/jwtSign.middleware');
const webhook = require('../models/webhook.model');
const surveyResponses = require('../models/surveyResponse.model');
const permissionList = require('../helper/grantList');
const tokenList = {};


class managementCred {

    login = async (req, res, next) => {
        const {email, password} = req.body;
        if (!email && !password) return res.status(401).send("invalid formData");
        const userData = await user.findOne({email: email});
        if (!userData) {
            return res.json({msg: "User Doesn't Exists!"});
        }

        const isMatch = await userData.comparePassword(password);
        console.log(isMatch);
        if (!isMatch) return res.status(403).json("NOT AUTHORIZED")
        generateToken(user);

        const response = {
            userData: userData,
            role: userData.role,
            token: req.token,
            refreshToken: req.refreshToken
        }
        tokenList[`${req.refreshToken}`] = {...response}
        return res.status(200).json({message: "true", response});

    }

    create = async (req, res, next) => { // for only admin to create another user
        var userData = await user.findOne({ _id: req.user.id });
        if (!userData) return res.status(404).send("User not found");

        const grantList = [...userData.permissions];


        console.log(req.user.role);
        const permission = new permissionClass(req?.user?.role || 'user', grantList);

        console.log("check " + permission.checkCreate(req.body.role)); //testing

        if (!permission.checkCreate(req.body.role)) return res.status(403).send("Unauthorized");
        try {

            const {firstName, username, email, mobile, role} = req.body;
            let password = '';
            if (req.body.password) password = req.body.password;
            else password = helper.randomPassword(12);
            console.log(password);
            const existingCheck = await user.findOne({email: email});
            if (existingCheck) {
                return res.status(403).send({success: "false", message: "Already exist"});
            }
            const newUser = new user({firstName, email, username,mobile, password, role, permissions: permissionList[`${role}`] });

            await newUser.save(async (err, user) => {
                if (err) {
                    return next(err)
                }
                return res.json({success: "true", message: `${user.role} created`})
            });

        } catch (e) {
            console.log(e)
            res.status(500).send({success: false, message: "something went wrong."})
        }
    }

    block = (req, res, next) => {

    }

    updateManagement = (req, res, next) => {

    }
    createProject = async (req, res, next) => {
        try {
            var userData = await user.findOne({ _id: req.user.id });
            if (!userData) return res.status(404).send("User not found");

            const grantList = [...userData.permissions]; //combine this grant list with the specified one for the role

            const permission = new permissionClass(req?.user?.role || 'user', grantList);

            //console.log("check " + permission.checkCreate("user")); //testing

            if (!permission.checkCreate("project")) return res.status(403).send("Unauthorized");

            const { project_name, project_type, operational_member, sales_member } = req.body;
            let projectData = await project.findOne({ project_name: project_name });
            console.log(projectData)
            if (projectData) return res.status(403).json({ success: "false", message: "Project with this name already exist" });

            projectData = new project({ project_name, project_type, operational_member, sales_member });
            await projectData.save();
            return res.json({ success: true, message: "Project created" })
        } catch (e) {
            console.log(e);
            return res.status(500).json(e.message);
        }

        // 2 types
    }

    getProjects = async (req, res, next) => {
        try {
            var userData = await user.findOne({ _id: req.user.id });
            if (!userData) return res.status(404).send("User not found");

            const grantList = [...userData.permissions];

            const permission = new permissionClass(req?.user?.role || 'user', grantList);
            if (!permission.checkRead("project")) return res.status(403).send("Unauthorized");
        //    if (!req.body.project_name)  return res.status(400).json({ success: false, message: "No Project Name provided" })
            const projectData = await project.find();
            if (!projectData[0]) return res.status(404).json({ success: "false", message: "No Project Found" });
            return res.json(projectData);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    }

    getInfoProject = (req, res, next) => {


    }

    updateProject = async (req, res, next) => {

        try {
            var userData = await user.findOne({ _id: req.user.id });
            if (!userData) return res.status(404).send("User not found");

            const grantList = [...userData.permissions]; //combine this grant list with the specified one for the role

            const permission = new permissionClass(req?.user?.role || 'user', grantList);

            //console.log("check " + permission.checkCreate("user")); //testing

            if (!permission.checkUpdate("project")) return res.status(403).send("Unauthorized");

            const { project_name, project_type, operational_member, sales_member } = req.body;
            let projectData = await project.findOne({ project_name: project_name });
        } catch (e) {
            return res.status(500).json(e.message);
        }

    }

    getJson = async (req, res, next) => {
        try {
            const {surveyId} = req.body;
            const survey = await webhook.findOne({surveyId: surveyId});
            if (!survey) return res.status(404).send("NOT FOUND");
            const surveyResponse = await surveyResponses.find({surveyId: surveyId});
            if (!surveyResponse) return res.status(404).send("NO RESPONSE FOUND");

            let temp = [];
            for (let j = 0; j < surveyResponse.length; j++) {
                let responses = [];
                for (let i = 0; i < survey.data.Data.Questions.length; i++) {
                    responses.push({
                        Caption: survey.data.Data.Questions[i].Caption,
                        response: surveyResponse[j].respondentData.Responses[i].ResponseCaption
                    });
                }
                temp.push(
                    {
                        RespondentName: surveyResponse[j].respondentData.FirstName,
                        Response: [...responses]
                    }
                )

            }
            /*let combine = { ...survey.data.Data.Questions };
            for (let i = 0; i < survey.data.Data.Questions.length; i++) {
                let temp = [];
                for (let j = 0; j < surveyResponse.length; j++) {

                    temp.push({
                        Respondent: surveyResponse[j].respondentData.FirstName,
                        Email: surveyResponse[j].respondentData.Email,
                        ResponseId: surveyResponse[j].respondentData.Responses[i].ResponseId,
                        ResponseCaption: surveyResponse[j].respondentData.Responses[i].ResponseCaption
                    });
                }
                combine[`${i}`][`responses`] = [...temp];
            }*/
            res.json(temp);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

    }

    //create and manage programs

}

module.exports = new managementCred();
