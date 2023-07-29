const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const UserRouter = express.Router();
const salt = bcrypt.genSaltSync(13);

UserRouter.get("/", async (req, res) => {
  try {
    const data = await User.findAll();
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

UserRouter.get("/:id", async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

UserRouter.post("/", async (req, res) => {
  try {
    const encryptedPassword = bcrypt.hashSync(
      Buffer.from(req.body.password).toString("base64"),
      salt
    );

    const data = await User.create({
      ...req.body,
      password: encryptedPassword,
    });

    return res.status(201).json(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

UserRouter.put("/:id", async (req, res) => {
  try {
    let { password } = req.body;
    const data = req.body;

    if (password) {
      data.password = bcrypt.hashSync(
        Buffer.from(password).toString("base64"),
        salt
      );
    }

    const result = await User.update(data, { where: { id: req.params.id } });
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

UserRouter.delete("/:id", async (req, res) => {
  try {
    const data = await User.destroy({ where: { id: req.params.id } });
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

module.exports = UserRouter;
