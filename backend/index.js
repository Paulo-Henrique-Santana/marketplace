const express = require("express");
const cors = require("cors");

const conn = require("./db/conn");
const UserRouter = require("./routes/user.routes");
const AuthRouter = require("./routes/auth.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

conn
  .sync({ alter: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
