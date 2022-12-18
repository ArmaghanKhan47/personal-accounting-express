const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const _ = require('lodash');

exports.register = async (req, res) => {
  try{
    console.log(req.body);
    let user = new UserModel({
      username: req.body.username,
      password: req.body.password
    });
    console.log(user);
    await user.save();
    res.send('User register successful');
  } catch(err){
    console.error(err);
    res.status(500).send('Something went wrong');
  }
}

exports.login = async (req, res) => {
  try{
    let users = await UserModel.find({ $and: [
      {
        username: req.body.username
      },
      {
        password: req.body.password
      }
    ]}).exec();

    if(users.length < 1){
      return res.status(404).send('User not found');
    }

    let payload = {
      id: users[0]._id,
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
