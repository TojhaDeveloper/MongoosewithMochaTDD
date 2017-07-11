const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name : {
    type : String,
    validate : {
    validator : (name) => { return name.length > 2},
    message : 'Name must be longer than 2 characters'},
    required : [true,'Name field is required.']},
  postCount : Number
});
//User variable holds the entire collection of the Data User model
const User = mongoose.model('user', UserSchema);

module.exports = User;
