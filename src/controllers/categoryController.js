const prisma = require("../models/prisma");

// GET ALL
const getCategories = async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });

  res.json(categories);
};

// CREATE
const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await prisma.category.create({
    data: { name },
  });

  res.status(201).json(category);
};

// UPDATE
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: { name },
  });

  res.json(category);
};

// DELETE
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await prisma.category.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Category deleted" });
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};