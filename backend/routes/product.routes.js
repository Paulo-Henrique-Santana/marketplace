const express = require("express");
const bcrypt = require("bcrypt");
const Product = require("../models/Product");
const Favorite = require("../models/Favorites");
const ProductImage = require("../models/ProductImage");
const upload = require("../config/multer");
const { Op } = require("sequelize");

const ProductRouter = express.Router();

ProductRouter.get("/", async (req, res) => {
  try {
    const {
      idCategory,
      page,
      pageSize,
      name,
      minPrice,
      maxPrice,
      idLoggedUser,
      idSeller,
    } = req.query;

    const findOptions = {
      where: {},
      include: [{ model: ProductImage, as: "images" }],
      distinct: true,
    };

    if (page && pageSize) {
      findOptions.limit = pageSize;
      findOptions.offset = (page - 1) * pageSize;
    }

    if (name) {
      findOptions.where.name = { [Op.iLike]: "%" + name + "%" };
    }

    if (minPrice && maxPrice) {
      findOptions.where.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      findOptions.where.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      findOptions.where.price = { [Op.lte]: maxPrice };
    }

    if (idCategory) {
      findOptions.where.idCategory = idCategory;
    }

    if (idLoggedUser) {
      findOptions.include.push({ model: Favorite, as: "favorites" });
    }

    if (idSeller) {
      findOptions.where.idUser = idSeller;
    }

    const { rows, count } = await Product.findAndCountAll(findOptions);

    const result = {
      items: rows,
      hasNext: count > pageSize * page,
    };

    return res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

ProductRouter.get("/:id", async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id, {
      include: { model: ProductImage, as: "images" },
    });
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

ProductRouter.post("/", upload.array("image"), async (req, res) => {
  try {
    const product = await Product.create(req.body);

    const productsImages = req.files.map((item) => {
      return {
        fileName: item.filename,
        idProduct: product.id,
      };
    });

    await ProductImage.bulkCreate(productsImages);

    return res.status(201).json(product);
  } catch (err) {
    res.status(400).send(err);
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
    res.status(400).send(err);
  }
});

ProductRouter.delete("/:id", async (req, res) => {
  try {
    const data = await Product.destroy({ where: { id: req.params.id } });
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
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
