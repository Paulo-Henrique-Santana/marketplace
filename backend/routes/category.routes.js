const express = require("express");
const Category = require("../models/Category");

const CategoryRouter = express.Router();

CategoryRouter.get("/", async (req, res) => {
  try {
    const data = await Category.findAll();
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

CategoryRouter.get("/:id", async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

CategoryRouter.get("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
CategoryRouter.post("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
CategoryRouter.put("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
CategoryRouter.delete("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});

module.exports = CategoryRouter;
