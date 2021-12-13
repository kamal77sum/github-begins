const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    role: {type:String},
    resource: {type:String},
    action: {type: String},
    attributes: {type: String}
});

const managementInfoSchema = new mongoose.Schema({
    id: {type: String , required: true},
    name: {type: String , required: true},
    role: {type: String , required: true},
    permissions: [permissionSchema]
});



module.exports = mongoose.model('managementInfo',managementInfoSchema);
