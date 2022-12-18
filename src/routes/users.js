const router = require('express').Router();
const passport = require('passport');

exports.init = () => {
  router.get('/', passport.authenticate('jwt', {session: false}),function(req, res, next) {
    let { username } = req.user;
    res.json({
      username
    });
  });

  this.app.use('/user', router);
}