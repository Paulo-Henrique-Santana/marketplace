import express, { urlencoded, json } from "express";
import cors from "cors";

import { sequelize } from "./db/conn";
import { UserRouter } from "./routes/user.routes";
import { AuthRouter } from "./routes/auth.routes";
import { ProductRouter } from "./routes/product.routes";
import { CategoryRouter } from "./routes/category.routes";
import { FavoriteRouter } from "./routes/favorite.routes";

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

// app.use(/(\/api)/, (req, res, next) => {
//   if (
//     req.headers.authorization === undefined ||
//     req.headers.authorization.split(" ")[0] !== "Bearer"
//   ) {
//     const status = 401;
//     const message = "Error in authorization format";
//     res.status(status).json({ status, message });
//     return;
//   }
//   try {
//     let verifyTokenResult;
//     verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

//     if (verifyTokenResult) {
//       const status = 401;
//       const message = "Access token not provided";
//       res.status(status).json({ status, message });
//       return;
//     }
//     next();
//   } catch (err) {
//     const status = 401;
//     const message = "Error access_token is revoked";
//     res.status(status).json({ status, message });
//   }
// });

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/favorite", FavoriteRouter);
app.use("/api/files", express.static("uploads"));

sequelize
  .sync({ alter: true })
  .then(async () => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
