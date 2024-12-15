const Expense = require("../models/Expense");

exports.getAllExpenses = async (req, res, next) => {
  try {
    const {
      category,
      minAmount,
      maxAmount,
      startDate,
      endDate,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { user: req.user.id };

    if (category) filter.category = category;
    if (minAmount || maxAmount)
      filter.amount = {
        ...(minAmount && { $gte: minAmount }),
        ...(maxAmount && { $lte: maxAmount }),
      };
    if (startDate || endDate)
      filter.createdAt = {
        ...(startDate && { $gte: new Date(startDate) }),
        ...(endDate && { $lte: new Date(endDate) }),
      };

    const sort = sortBy ? sortBy.split(",").join(" ") : "-createdAt";
    const skip = (page - 1) * limit;

    const expenses = await Expense.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    const totalExpenses = await Expense.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: expenses.length,
      total: totalExpenses,
      page: Number(page),
      limit: Number(limit),
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

exports.addExpense = async (req, res, next) => {
  try {
    const { title, amount, category, paymentMethod } = req.body;

    const newExpense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      data: newExpense,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.bulkDeleteExpenses = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. Provide an array of IDs.",
      });
    }

    const result = await Expense.deleteMany({
      _id: { $in: ids },
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} expenses deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
