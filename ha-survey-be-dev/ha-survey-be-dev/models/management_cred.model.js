var mongoose = require('mongoose');
    crypto = require('crypto');
    SALT_WORK_FACTOR = 10;

const managementCredSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String , required: true},
    email: { type: String , required: true},
    password: {type: String , required: true},
    info_id: { type: mongoose.Types.ObjectId }
});


managementCredSchema.pre('save', function (next) {
    var user = this;


    if (!user.isModified('password')) return next();
    if (user.password.length < 6) return next({ message: "Password must be 6 characters long" })
    // generate a salt
    this.salt = crypto.randomBytes(10).toString('hex');
    user.password = crypto.pbkdf2Sync(user.password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
    next();
});

managementCredSchema.methods.comparePassword = function(password) {
    this.salt = crypto.randomBytes(10).toString('hex');
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};


module.exports = mongoose.model('managementCred', managementCredSchema);