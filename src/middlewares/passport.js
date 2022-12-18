const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user');
const _ = require('lodash');

const verify = async (jwt_payload, done) => {
  console.log(jwt_payload);
  let user = await UserModel.findOne({ _id: jwt_payload.id });

  if (!_.isEmpty(user)) {
    done(null, user);
  } else {
    done(null, false);
  }
};

const tokenExtractor = (req) => {
  console.log(req);
}

exports.init = (passport) => {
  let opt = {
  };
  // opt.jwtFromRequest =  ExtractJWT.fromAuthHeaderAsBearerToken();
  opt.jwtFromRequest =  ExtractJWT.fromExtractors([ExtractJWT.fromAuthHeaderAsBearerToken(), tokenExtractor]);
  opt. secretOrKey = process.env.JWT_SECRET_KEY;

  console.log('opt');
  console.log(opt);

  try {
    passport.use(new JWTStrategy(opt, verify));
  } catch(err){
    throw err;
  }
}