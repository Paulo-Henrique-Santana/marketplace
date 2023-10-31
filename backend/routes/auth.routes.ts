import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const AuthRouter = express.Router();

AuthRouter.post("/", async (req, res) => {
  let { email, password } = req.body;

  let user: any = null;
  try {
    user = await User.findOne({
      where: {
        email,
      },
    });
  } catch {
    return res.status(401).send({
      message: "Usuário inválido",
    });
  }

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send({
      message: "Usuário inválido",
    });
  }

  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: user.get("id"), login: user.get("email"), type: "user" },
      "o2PDvjwrbp4fVO8rwvKy3Bb4Pi2r3GFgn4C5iwEqqDRXTT4ndZD04r9PyOT8HdOssBgapvL6JuktadmlQq192e9Ormd9unQUDpp4jyViUqhgc8Q1rOexPXr1ahWCO9Sz",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res.status(401).send({
      message: "Usuário inválido",
    });
  }

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
    },
    token: token,
  });
});

AuthRouter.get("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
AuthRouter.post("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
AuthRouter.put("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
AuthRouter.delete("*", async (req, res) => {
  return res.json({ message: "Endpoint não encontrado" });
});
