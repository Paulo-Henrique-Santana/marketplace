const express = require("express");
const bcrypt = require("bcrypt");
const Product = require("../models/Product");
const upload = require("../config/multer");
const ProductImage = require("../models/ProductImage");
const { Op } = require("sequelize");

const ProductRouter = express.Router();

ProductRouter.get("/", async (req, res) => {
  try {
    const { idCategory, page, pageSize, name, minPrice, maxPrice } = req.query;

    const findOptions = {
      where: {},
      include: { model: ProductImage, as: "images" },
      distinct: true,
    };

    if (page && pageSize) {
      findOptions.limit = pageSize;
      findOptions.offset = (page - 1) * pageSize;
    }

    if (name) {
      findOptions.where = {
        ...findOptions.where,
        name: { [Op.iLike]: "%" + name + "%" },
      };
    }

    if (minPrice && maxPrice) {
      findOptions.where = {
        ...findOptions.where,
        price: { [Op.between]: [minPrice, maxPrice] },
      };
    } else if (minPrice) {
      findOptions.where = {
        ...findOptions.where,
        price: { [Op.gte]: minPrice },
      };
    } else if (maxPrice) {
      findOptions.where = {
        ...findOptions.where,
        price: { [Op.lte]: maxPrice },
      };
    }

    if (idCategory) {
      findOptions.where = { ...findOptions.where, idCategory };
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
    console.log(req.body);
    const product = await Product.create(req.body);

    // for (const img of req.files) {
    //   await ProductImage.create({
    //     fileName: img.filename,
    //     idProduct: product.id,
    //   });
    // }

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
