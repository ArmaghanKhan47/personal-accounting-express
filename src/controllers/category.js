const CategoryModel = require('../models/category');

exports.index = async (req, res) => {
  try{
    let categories = await CategoryModel.find({ user_id: req.user.id}).all();
    res.json(categories);
  }
  catch(err){
    res.status(500).send('Something went wrong');
  }
}

exports.create = async (req, res) => {
  try{
    let category = new CategoryModel({
      name: req.body.name,
      user_id: req.user.id
    });
    await category.save();
    res.json(category);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Something went wrong');
  }
}

exports.show = async (req, res) => {
  try{
    let category = await CategoryModel.findOne({ _id: req.params.id });
    res.json(category);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Something went wrong');
  }
}

exports.update = async (req, res) => {
  try{
    let category = await CategoryModel.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      { returnDocument: 'after' }
    );
    res.json(category);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Something went wrong');
  }
}

exports.delete = async (req, res) => {
  try{
    await CategoryModel.deleteOne({ _id: req.params.id });
    res.send('Category deleted');
  }
  catch(err){
    console.log(err);
    res.status(500).send('Something went wrong');
  }
}