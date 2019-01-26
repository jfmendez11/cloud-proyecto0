/* Global Require */
const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true,},
});

UsersSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
    .exec((err, user) => {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
  }

UsersSchema.pre('save', (next) => {
    var user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
});

module.exports = mongoose.model('Users', UsersSchema);