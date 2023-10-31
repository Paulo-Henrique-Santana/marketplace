import express from "express";
import { Favorite } from "../models/Favorites";
import { Product } from "../models/Product";
import { ProductImage } from "../models/ProductImage";

export const FavoriteRouter = express.Router();

FavoriteRouter.get("/", async (req, res) => {
  try {
    const { idUser } = req.query;

    if (idUser) {
      const data = await Favorite.findAll({
        where: { idUser },
        include: {
          model: Product,
          as: "product",
          include: [{ model: ProductImage, as: "images" }],
        },
      });
      return res.status(200).json(data);
    } else {
      res.status(422).send({ message: "idUser expected as query parameter" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

FavoriteRouter.get("/:id", async (req, res) => {
  try {
    const data = await Favorite.findByPk(req.params.id, {
      include: {
        model: Product,
        as: "product",
        include: [{ model: ProductImage, as: "images" }],
      },
    });
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

FavoriteRouter.post("/", async (req, res) => {
  try {
    const data = await Favorite.create({
      ...req.body,
    });

    return res.status(201).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

FavoriteRouter.put("/:id", async (req, res) => {
  try {
    const result = await Favorite.update(req.body, {
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
