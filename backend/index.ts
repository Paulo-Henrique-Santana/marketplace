import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { sequelize } from "./db/conn";
import { AuthRouter } from "./routes/auth.routes";
import { CategoryRouter } from "./routes/category.routes";
import { FavoriteRouter } from "./routes/favorite.routes";
import { ProductRouter } from "./routes/product.routes";
import { UserRouter } from "./routes/user.routes";
import { verifyJWT } from "./middlewares/verifyJwt";

dotenv.config();

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  app.use(cors());
  next();
});

app.use("/api/auth", AuthRouter);
app.use("/api/user", verifyJWT, UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/favorite", verifyJWT, FavoriteRouter);
app.use("/api/files", express.static("uploads"));

sequelize
  .sync({ alter: true })
  .then(async () => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
