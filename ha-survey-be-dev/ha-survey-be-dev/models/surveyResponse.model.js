var mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    surveyId: {type: String},
    respondentData: { type: Object },
    header: { type: Object },
    createAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updateAt: { type: mongoose.Schema.Types.Date, default: Date.now },
});


module.exports = mongoose.model('surveyResponse', ResponseSchema);
