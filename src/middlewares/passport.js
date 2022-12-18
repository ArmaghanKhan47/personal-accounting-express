const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user');
const _ = require('lodash');

const verify = async (jwt_payload, done) => {
  let user = await UserModel.findOne({ _id: jwt_payload.id });

  if (!_.isEmpty(user)) {
    done(null, user);
  } else {
    done(null, false);
  }
};

exports.init = (passport) => {
  let opt = {
  };
  opt.jwtFromRequest =  ExtractJWT.fromAuthHeaderAsBearerToken();
  opt. secretOrKey = process.env.JWT_SECRET_KEY;

  try {
    passport.use(new JWTStrategy(opt, verify));
  } catch(err){
    throw err;
  }
}