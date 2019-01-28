const bodyParser = require('body-parser');
const Users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = (app, express) => {
  let apiRouter = express.Router();
  apiRouter.route('/')
  .post((req, res, next) => {
    if (req.body.password !== req.body.passwordConf && req.body.passwordConf && req.body.password) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      //res.send("passwords dont match");
      res.json({message: 'Contraseñas no son iguales', status: 400});
      return next(err);
    }
    else if(req.body.email && req.body.password && req.body.passwordConf) {
      let user = new Users();
      let contrasena;
      Users.findOne({email: req.body.email})
      .exec((err, result) => {
        if(err) return next(err);
        else if (!result) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return next(err);
            }
            contrasena = hash;
            user.email = req.body.email;
            user.password = contrasena;
            user.save((err, user) => {
              if(err) res.send(err);
              return res.json({message: 'Usuario creado existosamente', status: 200, user: {email: user.email, _id: user._id}});
            });
          });
        } else return res.json({message: 'Ya existe un usuario con ese email', status: 400});
      });
      
      
    } /*else if (req.body.logemail && req.body.logpassword) {
      console.log('entra al else if');
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        console.log('entra al authenticate');
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          res.json({message:'Email o contraseña incorrectos', status: 400})
          return next(err);
        } else {
          console.log('else del login');
          //req.session.userId = user._id;
          //return res.redirect('/profile');
          return res.json({message:'Log In existoso', status: 200, user: {email: user.email, _id: user._id}})
        }
      });
    } */else {
      var err = new Error('All fields required.');
      err.status = 400;
      return res.json({message: 'Todos los campos son requeridos', status: 400});
    }
  });
  apiRouter.route('/log-in') 
  .post((req, res, next) => {
    Users.findOne({email: req.body.logemail})
    .exec((err, user) => {
      if(err) return next(err);
      else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return res.json({message: 'Usuario no encontrado', status: 401});
      }
      /*let contrasena;
      bcrypt.hash(req.body.logpassword, 10, (err, hash) => {
        if (err) {
          return next(err);
        }
        console.log('hash', hash);
        contrasena = hash;
      });
      console.log('contra',contrasena);*/
      bcrypt.compare(req.body.logpassword, user.password, (err, result) => {
        if(result === true) {
          return res.json({message: 'Log In Existoso', status: 200, user: {email: user.email, _id: user._id}});
        } else {
          return res.json({message: 'Incorrect password', status: 401});
        }
      });
    });
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