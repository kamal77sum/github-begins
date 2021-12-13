var mongoose = require('mongoose');

const WebhookSchema = new mongoose.Schema({
    data: { type: Object },
    header: { type: Object },
    x_hook_key: {type:String},
    createAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updateAt: { type: mongoose.Schema.Types.Date, default: Date.now },
});


module.exports =  mongoose.model('webhook', WebhookSchema);
