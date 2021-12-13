var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');
SALT_WORK_FACTOR = 10;


const UserSchema = new mongoose.Schema({
    firstName: {type: mongoose.Schema.Types.String},
    lastName: {type: mongoose.Schema.Types.String},
    email: {type: mongoose.Schema.Types.String, required: [true, 'User Email required']},
    mobile: {type: mongoose.Schema.Types.String, required: [true, 'User phone number required']},
    username: {type: mongoose.Schema.Types.String, index: {unique: true}},
    profilePic: {type: mongoose.Schema.Types.String},
    password: {type: mongoose.Schema.Types.String, required: true},
    salt: {type: String},
    isActive: {type: mongoose.Schema.Types.Boolean, default: true},
    createAt: {type: mongoose.Schema.Types.Date, default: Date.now},
    updateAt: {type: mongoose.Schema.Types.Date, default: Date.now},
    role: {type: String, enum: ['basic', 'admin'], default: 'basic'},
    permissions: [{type: mongoose.Schema.Types.Array, default: []}],
});

UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    if (user.password.length < 6) return next({message: "Password must be 6 characters long"})
    // generate a salt
    user.salt = crypto.randomBytes(10).toString('hex');
    user.password = crypto.pbkdf2Sync(user.password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
    next();
});

UserSchema.methods.comparePassword = function (password) {

    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.password === hash;
};

// to prevent the password from being sent to the client
UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.salt;
        delete ret.permissions;
        delete ret.__v;
        return ret;
    }
})


module.exports = mongoose.model('User', UserSchema);

