/* Global Require */
const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true,},
});

module.exports = mongoose.model('Users', UsersSchema);