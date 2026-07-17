const prisma = require("../models/prisma");

// GET ALL
const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  res.json(products);
};

// GET BY CATEGORY
const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const products = await prisma.product.findMany({
    where: {
      categoryId: Number(categoryId),
    },
  });

  res.json(products);
};

// CREATE
const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    image,
    categoryId,
  } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      categoryId,
    },
  });

  res.status(201).json(product);
};

// UPDATE
const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: req.body,
  });

  res.json(product);
};

// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  res.json({
    message: "Product deleted",
  });
};

module.exports = {
  getProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};