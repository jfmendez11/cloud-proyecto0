var express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users');

module.exports = (app, express) => {
  let apiRouter = express.Router();
  apiRouter.route('/')
  .post((req, res) => {
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send("passwords dont match");
      return next(err);
    }
    if(req.body.email && req.body.password && req.body.passwordConf) {
      let user = new Users();
      user.email = req.body.email;
      user.password =  req.body.password;
      user.save((err) => {
        if(err) return res.send(err);
        return res.json({message: 'Usuario creado existosamente'});
      });
    } else if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  });
  apiRouter.route('/profile') 
  .get((req, res, next) => {
    Users.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          //return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          res.send('a ver esto que manda');
        }
      }
    });
  });
  apiRouter.route('/logout')
  .get((req, res, next) => {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  }); 
  return apiRouter;
}