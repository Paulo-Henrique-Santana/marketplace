import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import validateJWT from "../validateJWT";

export const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
  try {
    const { cpf, email } = req.query;

    if (cpf) {
      const data = await User.findAll({ where: { cpf } });
      return res.status(200).json(data);
    }

    if (email) {
      const data = await User.findAll({ where: { email } });
      return res.status(200).json(data);
    }

    const data = await User.findAll();
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

UserRouter.get("/:id", async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

UserRouter.post("/", async (req, res) => {
  try {
    const { email, cpf } = req.body;

    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(409).send({ message: "Email já cadastrado" });
    }

    user = await User.findOne({ where: { cpf } });

    if (user) {
      return res.status(409).send({ message: "CPF já cadastrado" });
    }

    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);

    const data = await User.create({
      ...req.body,
      password: encryptedPassword,
    });

    return res.status(201).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

UserRouter.put("/:id", validateJWT, async (req, res) => {
  try {
    let { password } = req.body;
    const data = req.body;

    if (password) {
      data.password = bcrypt.hashSync(
        Buffer.from(password).toString("base64"),
        10
      );
    }

    const result = await User.update(data, { where: { id: req.params.id } });
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

UserRouter.delete("/:id", validateJWT, async (req, res) => {
  try {
    const data = await User.destroy({ where: { id: req.params.id } });
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

UserRouter.get("*", async (req, res) => {
  return res.json({ error: "Endpoint não encontrado" });
});
UserRouter.post("*", async (req, res) => {
  return res.json({ error: "Endpoint não encontrado" });
});
UserRouter.put("*", async (req, res) => {
  return res.json({ error: "Endpoint não encontrado" });
});
UserRouter.delete("*", async (req, res) => {
  return res.json({ error: "Endpoint não encontrado" });
});
