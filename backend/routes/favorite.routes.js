const express = require("express");
const bcrypt = require("bcrypt");
const Favorite = require("../models/Favorites");
const Product = require("../models/Product");

const FavoriteRouter = express.Router();

FavoriteRouter.get("/", async (req, res) => {
  try {
    const { idUser } = req.query;

    if (idUser) {
      const data = await Favorite.findAll({ where: { id } });
      return res.status(200).json(data);
    } else {
      res.status(422).send({ message: "IdUser expected as query parameter" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

FavoriteRouter.get("/:id", async (req, res) => {
  try {
    const data = await Favorite.findByPk(req.params.id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

FavoriteRouter.post("/", async (req, res) => {
  try {
    const { email, cpf } = req.body;

    let user = await Favorite.findOne({ where: { email } });

    if (user) {
      return res.status(409).send({ message: "Email já cadastrado" });
    }

    user = await Favorite.findOne({ where: { cpf } });

    if (user) {
      return res.status(409).send({ message: "CPF já cadastrado" });
    }

    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);

    const data = await Favorite.create({
      ...req.body,
      password: encryptedPassword,
    });

    return res.status(201).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

FavoriteRouter.put("/:id", async (req, res) => {
  try {
    let { password } = req.body;
    const data = req.body;

    if (password) {
      data.password = bcrypt.hashSync(
        Buffer.from(password).toString("base64"),
        salt
      );
    }

    const result = await Favorite.update(data, {
      where: { id: req.params.id },
    });
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

FavoriteRouter.delete("/:id", async (req, res) => {
  try {
    const data = await Favorite.destroy({ where: { id: req.params.id } });
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

FavoriteRouter.get("*", async (req, res) => {
  return res.json({ error: "Endpoint não encontrado" });
});
FavoriteRouter.post("*", async (req, res) => {
  return res.json({ error: "Endpoint não encontrado" });
});
FavoriteRouter.put("*", async (req, res) => {
  return res.json({ error: "Endpoint não encontrado" });
});
FavoriteRouter.delete("*", async (req, res) => {
  return res.json({ error: "Endpoint não encontrado" });
});

module.exports = FavoriteRouter;
