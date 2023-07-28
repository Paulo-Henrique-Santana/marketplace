const express = require("express");
const app = express();
const conn = require("./db/conn");
const { UserRouter } = require("./routes/user.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

conn
  .sync({ force: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

const User = require("./models/User");
