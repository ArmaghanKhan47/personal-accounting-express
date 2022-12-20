const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { $where } = require('../models/expense');

exports.register = async (req, res) => {
  try{
    let existing_user = UserModel.findOne({ username: req.body.username }).exec();
    console.log(existing_user);
    if (_.isEmpty(existing_user)){
      return res.status(401).send('User already exists');
    }
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
      username: req.body.username
    }).exec();

    if(_.isEmpty(user)){
      return res.status(404).send('User not found');
    }

    if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).send('Invalid Credentials');
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
