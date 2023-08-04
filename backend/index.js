const express = require("express");
const conn = require("./db/conn");
const UserRouter = require("./routes/user.routes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, OPTIONS"
  ),
    app.use(cors());
  next();
});

app.use("/api/user", UserRouter);

conn
  .sync({ alter: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
