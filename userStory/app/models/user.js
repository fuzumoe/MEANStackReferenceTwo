/*###########################*/
// use mongoose module
var mongoose = require('mongoose');

/*###########################*/
// mongoose schema to create nosql schema which are equivalent to sql table
var Schema = mongoose.Schema;
//use bycrypt module for hashing passord
var bcrypt = require('bcrypt-nodejs');
/*###########################*/
//users schema
var UserSchema = new Schema({
    name: String,
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false}

});
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();

    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err)
            return next(err);
        user.password = hash;
        next();
    });

});

UserSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
/*###########################*/