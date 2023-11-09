import cors from "cors";
import dotenv from "dotenv";
import express, { Request, json, urlencoded } from "express";
import jwt from "jsonwebtoken";
import { sequelize } from "./db/conn";
import { AuthRouter } from "./routes/auth.routes";
import { CategoryRouter } from "./routes/category.routes";
import { FavoriteRouter } from "./routes/favorite.routes";
import { ProductRouter } from "./routes/product.routes";
import { UserRouter } from "./routes/user.routes";

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

const verifyRouteNeedToken = (req: Request) => {
  const regex = /\/api\/(.*?)\?/;
  const route = regex.exec(req.url)?.toString();

  const routesToken = [
    { name: "user" },
    { name: "favorite" },
    { name: "product", methods: ["POST", "PUT", "DELETE"] },
  ];

  if (route) {
    return routesToken.some((item) => {
      if (item.name === route) {
        if (!item.methods) {
          return true;
        } else if (item.methods.includes(req.method)) {
          return true;
        } else {
          return false;
        }
      }
    });
  }

  return false;
};

app.use((req, res, next) => {
  if (!verifyRouteNeedToken(req)) {
    return next();
  }

  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }

  try {
    var token = req.headers?.["authorization"]?.split(" ")[1];

    jwt.verify(token!, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) return res.status(401).send({ message: "Invalid token" });
      next();
    });
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

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
