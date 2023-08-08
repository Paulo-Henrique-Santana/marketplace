const express = require("express");
const bcrypt = require("bcrypt");
const Product = require("../models/Product");

const ProductRouter = express.Router();

ProductRouter.get("/", async (req, res) => {
  try {
    const { idCategory } = req.query;

    if (idCategory) {
      const data = await Product.findAll({ where: { idCategory } });
      return res.status(200).json(data);
    }

    const data = await Product.findAll();
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

ProductRouter.get("/:id", async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

ProductRouter.post("/", async (req, res) => {
  try {
    const data = await Product.create(req.body);
    return res.status(201).json(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

ProductRouter.put("/:id", async (req, res) => {
  try {
    let { password } = req.body;
    const data = req.body;

    if (password) {
      data.password = bcrypt.hashSync(
        Buffer.from(password).toString("base64"),
        salt
      );
    }

    const result = await Product.update(data, { where: { id: req.params.id } });
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

ProductRouter.delete("/:id", async (req, res) => {
  try {
    const data = await Product.destroy({ where: { id: req.params.id } });
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

ProductRouter.get("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
ProductRouter.post("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
ProductRouter.put("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
ProductRouter.delete("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});

module.exports = ProductRouter;
