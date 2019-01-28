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
      
      
    } else {
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
      bcrypt.compare(req.body.logpassword, user.password, (err, result) => {
        if(result === true) {
          return res.json({message: 'Log In Existoso', status: 200, user: {email: user.email, _id: user._id}});
        } else {
          return res.json({message: 'Incorrect password', status: 401});
        }
      });
    });
  });
  return apiRouter;
}