const ExpenseModal = require('../models/expense');

exports.index = async (req, res) => {
  try{
    let expenses = await ExpenseModal.find({ category_id: req.query.category }).all();
    res.json(expenses);
  }
  catch(err){
    res.status(500).send('Something went wrong');
  }
}

exports.create = async (req, res) => {
  try{
    let expense = new ExpenseModal({
      value: req.body.value,
      category_id: req.body.category
    });
    await expense.save();
    res.json(expense);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Something went wrong');
  }
}

exports.show = async (req, res) => {
  try{
    let expense = await ExpenseModal.findOne({ _id: req.params.id });
    res.json(expense);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Something went wrong');
  }
}

exports.update = async (req, res) => {
  try{
    let expense = await ExpenseModal.findOneAndUpdate(
      { _id: req.params.id },
      { value: req.body.value },
      { returnDocument: 'after' }
    );
    res.json(expense);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Something went wrong');
  }
}

exports.delete = async (req, res) => {
  try{
    await ExpenseModal.deleteOne({ _id: req.params.id });
    res.send('Expense deleted');
  }
  catch(err){
    console.log(err);
    res.status(500).send('Something went wrong');
  }
}