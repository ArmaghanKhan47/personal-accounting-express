const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/category');

exports.init = () => {
  router.use(passport.authenticate('jwt', {session: false}));

  router.get('/', controller.index);
  router.post('/create', controller.create);
  router.get('/:id', controller.show);
  router.post('/:id', controller.update);
  router.delete('/:id', controller.delete);

  this.app.use('/category', router);
}