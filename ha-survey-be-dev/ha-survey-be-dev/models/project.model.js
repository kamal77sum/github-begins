var mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    project_id:{type:String},
    project_name: {type:String},
    project_type:{type: String,
        enum:['Best Places','Independent Studies'],
        default: 'Best Places',},
    project_area:{type:String},
    operational_member:{type: mongoose.Schema.Types.ObjectId, ref: "user"},
    sales_member:{type: mongoose.Schema.Types.ObjectId, ref: "user"},
    createAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updateAt: { type: mongoose.Schema.Types.Date, default: Date.now },
});


module.exports =  mongoose.model('project', ProjectSchema);
