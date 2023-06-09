const Expense = require("./../models/expenseModel");
const create = async (req, res, next) => {
  try {
    req.body.recorded_by = req.user._id;
    const expense = new Expense(req.body);
    await expense.save();
    return res
      .status(200)
      .json({ success: true, expense, message: "new expense recorded" });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
};

const listExpenses = async (req, res, next) => {
  try {
    let firstDay = req.query.firstDay;
    let lastDay = req.query.lastDay;

    let expenses = await Expense.find({
      $and: [
        { incurred_on: { $gte: firstDay, $lte: lastDay } },
        { recorded_by: req.user._id },
      ],
    })
      .sort("incurred_on")
      .populate("recorded_by", "_id name");
    return res.status(200).json({ success: true, expenses });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
};

const editExpense = async (req, res, next) => {
  try {
    let id = req.params.id;
    const expense = await Expense.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
      useFindAndModify: false,
    });
    return res.status(200).json({ success: true, expense });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    let firstDay = req.query.firstDay;
    let lastDay = req.query.lastDay;

    let expenses = await Expense.find({
      $and: [
        { incurred_on: { $gte: firstDay, $lte: lastDay } },
        { recorded_by: req.user._id },
      ],
    })
      .sort("incurred_on")
      .populate("recorded_by", "_id name");
    return res.status(200).json({ success: true, expenses });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
};

module.exports = { create, listExpenses, editExpense };
