const Expense = require("./../models/expenseModel");
const mongoose = require("mongoose");
const gem = require("./../utils/giveErrorMessage");
const create = async (req, res, next) => {
  try {
    req.body.recorded_by = req.user._id;
    const expense = new Expense(req.body);
    await expense.save();
    return res
      .status(200)
      .json({ success: true, expense, message: "new expense recorded" });
  } catch (err) {
    return res.status(500).json({ success: false, err: gem(err) });
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
    return res.status(500).json({ success: false, err: gem(err) });
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
    return res
      .status(200)
      .json({ success: true, expense, message: "Edited Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, err: gem(err) });
  }
};

const getExpense = async (req, res, next) => {
  try {
    let id = req.params.id;
    const expense = await Expense.findById(id);
    return res.status(200).json({ success: true, expense });
  } catch (err) {
    return res.status(500).json({ success: false, err: gem(err) });
  }
};
const deleteExpense = async (req, res, next) => {
  try {
    let id = req.params.id;
    const expense = await Expense.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "deleted sucessfully" });
  } catch (err) {
    return res.status(500).json({ success: false, err: gem(err) });
  }
};

const monthlyExpense = async (req, res, next) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const tomorrow = new Date();
  tomorrow.setUTCHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date();
  yesterday.setUTCHours(0, 0, 0, 0);
  yesterday.setDate(yesterday.getDate() - 1);
  try {
    let currentPreview = await Expense.aggregate([
      {
        $facet: {
          month: [
            {
              $match: {
                incurred_on: { $gte: firstDay, $lt: lastDay },
                recorded_by: new mongoose.Types.ObjectId(req.user._id),
              },
            },
            {
              $group: { _id: "currentMonth", totalSpent: { $sum: "$amount" } },
            },
          ],
          today: [
            {
              $match: {
                incurred_on: { $gte: today, $lt: tomorrow },
                recorded_by: new mongoose.Types.ObjectId(req.user._id),
              },
            },
            { $group: { _id: "today", totalSpent: { $sum: "$amount" } } },
          ],
          yesterday: [
            {
              $match: {
                incurred_on: { $gte: yesterday, $lt: today },
                recorded_by: new mongoose.Types.ObjectId(req.user._id),
              },
            },
            { $group: { _id: "yesterday", totalSpent: { $sum: "$amount" } } },
          ],
        },
      },
    ]);
    // console.log(currentPreview);
    let expensePreview = {
      month: currentPreview[0].month[0],
      today: currentPreview[0].today[0],
      yesterday: currentPreview[0].yesterday[0],
    };
    //console.log(expensePreview);
    res.status(200).json({ success: true, expensePreview });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err: gem(err) });
  }
};
const expenseByCategory = async (req, res) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  try {
    let categoryMonthlyAvg = await Expense.aggregate([
      {
        $facet: {
          average: [
            {
              $match: {
                recorded_by: new mongoose.Types.ObjectId(req.user._id),
              },
            },
            {
              $group: {
                _id: {
                  category: "$category",
                  month: { $month: "$incurred_on" },
                },
                totalSpent: { $sum: "$amount" },
              },
            },
            {
              $group: {
                _id: "$_id.category",
                avgSpent: { $avg: "$totalSpent" },
              },
            },
            {
              $project: {
                _id: "$_id",
                value: { average: "$avgSpent" },
              },
            },
          ],
          total: [
            {
              $match: {
                incurred_on: { $gte: firstDay, $lte: lastDay },
                recorded_by: new mongoose.Types.ObjectId(req.user._id),
              },
            },
            { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } },
            {
              $project: {
                _id: "$_id",
                value: { total: "$totalSpent" },
              },
            },
          ],
        },
      },
      {
        $project: {
          overview: { $setUnion: ["$average", "$total"] },
        },
      },
      { $unwind: "$overview" },
      { $replaceRoot: { newRoot: "$overview" } },
      { $group: { _id: "$_id", mergedValues: { $mergeObjects: "$value" } } },
    ]).exec();
    res.json({ success: true, categoryMonthlyAvg });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err: gem(err) });
  }
};

const plotExpenses = async (req, res) => {
  const date = new Date(req.query.month),
    y = date.getFullYear(),
    m = date.getMonth();

  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  // console.log(firstDay, lastDay);
  try {
    let totalMonthly = await Expense.aggregate([
      {
        $match: {
          incurred_on: { $gte: firstDay, $lt: lastDay },
          recorded_by: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      { $project: { x: { $dayOfMonth: "$incurred_on" }, y: "$amount" } },
    ]).exec();
    res.json({ success: true, totalMonthly });
  } catch (err) {
    return res.status(500).json({ success: false, err: gem(err) });
  }
};

const yearlyExpenses = async (req, res) => {
  const y = req.query.year;
  const firstDay = new Date(y, 0, 1);
  const lastDay = new Date(y, 12, 0);
  try {
    let totalMonthly = await Expense.aggregate([
      {
        $match: {
          incurred_on: { $gte: firstDay, $lt: lastDay },
          recorded_by: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: { $month: "$incurred_on" },
          totalSpent: { $sum: "$amount" },
        },
      },
      { $project: { x: "$_id", y: "$totalSpent" } },
    ]).exec();
    res.json({ success: true, monthTot: totalMonthly });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err: gem(err) });
  }
};

const averageCategories = async (req, res) => {
  const firstDay = new Date(req.query.firstDay);
  const lastDay = new Date(req.query.lastDay);
  try {
    let categoryMonthlyAvg = await Expense.aggregate([
      {
        $match: {
          incurred_on: { $gte: firstDay, $lte: lastDay },
          recorded_by: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: { category: "$category" },
          totalSpent: { $sum: "$amount" },
        },
      },
      { $group: { _id: "$_id.category", avgSpent: { $avg: "$totalSpent" } } },
      { $project: { x: "$_id", y: "$avgSpent" } },
    ]).exec();
    res.json({ monthAVG: categoryMonthlyAvg });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err: gem(err) });
  }
};

module.exports = {
  create,
  listExpenses,
  editExpense,
  deleteExpense,
  monthlyExpense,
  expenseByCategory,
  plotExpenses,
  yearlyExpenses,
  getExpense,
  averageCategories,
};
