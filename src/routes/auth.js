const router = require('express').Router();
const controller = require('../controllers/authenticate');
const guestMiddleware = require('../middlewares/guest');

exports.init = () => {
  router.use(guestMiddleware);
  router.post('/register', controller.register);
  router.post('/login', controller.login);

  this.app.use('/auth', router);
}