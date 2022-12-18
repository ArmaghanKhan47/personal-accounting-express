const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');

exports.register = async (req, res) => {
  try{
    let user = new UserModel({
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    res.send('User register successful');
  } catch(err){
    console.error(err);
    res.status(500).send('Something went wrong');
  }
}

exports.login = async (req, res) => {
  try{
    
    let user = await UserModel.findOne({
      username: req.body.username,
      password: req.body.password
      }).exec();

    if(_.isEmpty(user)){
      return res.status(404).send('User not found');
    }

    let payload = {
      id: user._id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    return res.json({
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Something went wrong');
  }
}
