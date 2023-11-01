import { Router } from "express";
import { FindOptions, Includeable, Op } from "sequelize";
import { upload } from "../config/multer";
import { Favorite } from "../models/Favorites";
import { Product } from "../models/Product";
import { ProductImage } from "../models/ProductImage";
import { verifyJWT } from "../middlewares/verifyJwt";

export const ProductRouter = Router();

ProductRouter.get("/", async (req, res) => {
  try {
    const {
      idCategory,
      name,
      minPrice,
      maxPrice,
      idLoggedUser,
      idSeller,
      idProducts,
    } = req.query;

    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    const findOptions: any = {
      where: {},
      include: [{ model: ProductImage, as: "images" }],
      distinct: true,
    };

    if (page && pageSize) {
      findOptions.limit = pageSize;
      findOptions.offset = (Number(page) - 1) * Number(pageSize);
    }

    if (typeof idProducts === "string") {
      findOptions.where.id = {
        [Op.in]: idProducts.split(",").map(Number),
      };
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
      findOptions.include.push({
        model: Favorite,
        as: "favorites",
        left: true,
        required: false,
        where: { idUser: idLoggedUser },
      });
    }

    if (idSeller) {
      findOptions.where.idUser = idSeller;
    }

    const { rows, count } = await Product.findAndCountAll(findOptions);

    const result = {
      items: rows,
      hasNext: count > pageSize * page,
      pages: count / pageSize,
    };

    return res.status(200).json(result);
  } catch (err: any) {
    res.status(400).send(err.toString());
  }
});

ProductRouter.get("/:id", async (req, res) => {
  try {
    const findOptions: FindOptions = {
      include: [{ model: ProductImage, as: "images" }],
    };

    if (req.query.idUser) {
      (findOptions.include as Includeable[]).push({
        model: Favorite,
        as: "favorites",
        where: { idUser: req.query.idUser },
      });
    }

    const data = await Product.findByPk(req.params.id, findOptions);

    return res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

ProductRouter.post("/", upload.array("image"), verifyJWT, async (req, res) => {
  try {
    const product: any = await Product.create(req.body);

    const productsImages = (req.files as any[]).map((item) => {
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

ProductRouter.put("/:id", verifyJWT, async (req, res) => {
  try {
    const result = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

ProductRouter.delete("/:id", verifyJWT, async (req, res) => {
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
