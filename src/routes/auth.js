const router = require('express').Router();
const controller = require('../controllers/authenticate');

exports.init = () => {
  router.post('/register', controller.register);
  router.post('/login', controller.login);

  this.app.use('/auth', router);
}