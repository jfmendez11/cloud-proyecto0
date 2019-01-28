/* Global Require */
const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsersSchema = new Schema({
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true,},
});

module.exports = mongoose.model('Users', UsersSchema);