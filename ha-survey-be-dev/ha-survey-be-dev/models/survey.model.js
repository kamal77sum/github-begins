var mongoose = require('mongoose');

const QuestionResponses =  new mongoose.Schema({
    ResponseId: {type:Number},
    Caption: {type:String},
    Hidden: {type:Boolean},
    Other: true,
    NotApplicable: true,
    Order: 1,
    Value: {type:Number},
    ScaleValue:{type:Number}
});

const surveySchema = new mongoose.schema({

    Id:{type:String},
    Title:{ type:String },
    SurveyStatusId: {type:Number},
    CreateDate: {type:Date},
    LastModifyDate: {type:Date},
    StartDate: {type:Date},
    EndDate: {type:Date},
    IsTrial: {type:Boolean},
    PanelistCount: {type:Number},
    RespondentCount: {type:String},
    CreatedBy: {type:String},
    QuestionCount: {type:Number},
    Questions: [
      {
        Id:{type:Number},
        DataLabel: {type:String},
        Language:{type:String},
        QuestionTypeId: {type:Number},
        Caption: {type:String},
        Required:{type:Boolean},
        DataTypeId: {type:Number},
        ScaleTypeId: {type:Number},
        MinValue: {type:Number},
        MaxValue: {type:Number},
        PageNumber: {type:Number},
        OrderNumber: {type:Number},
        QuestionNumber: {type:Number},
        ParentQuestionId: {type:Number},
        QuestionResponses : [QuestionResponses],
      }
    ],
    WebhookId: {type:Number},
    EventName: {type:String}
});

module.exports = mongoose.model('SurveyData',surveySchema)