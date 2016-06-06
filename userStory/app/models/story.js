/*###########################*/
// use mongoose module
var mongoose = require('mongoose');

/*###########################*/
// mongoose schema to create nosql schema which are equivalent to sql table
var Schema = mongoose.Schema;
//use bycrypt module for hashing passord
var bcrypt = require('bcrypt-nodejs');
/*###########################*/

var StorySchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Story', StorySchema);