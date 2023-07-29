const express = require("express");
const conn = require("./db/conn");
const UserRouter = require("./routes/user.routes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", UserRouter);

conn
  .sync({ alter: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
