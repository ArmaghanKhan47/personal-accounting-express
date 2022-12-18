const router = require('express').Router();
const passport = require('passport');

exports.init = () => {
  router.get('/', passport.authenticate('jwt', {session: false}),function(req, res, next) {
    res.send('passport jwt token authentication successful');
  });

  this.app.use('/user', router);
}