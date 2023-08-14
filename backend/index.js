const express = require("express");
const cors = require("cors");

const conn = require("./db/conn");
const UserRouter = require("./routes/user.routes");
const AuthRouter = require("./routes/auth.routes");
const ProductRouter = require("./routes/product.routes");
const Category = require("./models/Category");
const CategoryRouter = require("./routes/category.routes");
const Product = require("./models/Product");
const Favorite = require("./models/Favorites");
const ProductImage = require("./models/ProductImage");
Favorite;
ProductImage;

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

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/files", express.static("uploads"));

const productCategories = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Cosmetics",
  "Food",
  "Toys",
  "Furniture",
  "Books",
  "Sports",
  "Games",
  "Musical Instruments",
  "Automobiles",
];

conn
  .sync({ alter: true })
  .then(async () => {
    app.listen(3000);

    const categories = await Category.findAll();
    if (!categories.length) {
      Promise.all(
        productCategories.map(async (category) => {
          await Category.create({ name: category });
        })
      );
    }

    // for (let i = 0; i < 30; i++) {
    //   await Product.create({
    //     idUser: 1,
    //     name: "sla",
    //     quantity: 5,
    //     idCategory: 1,
    //     description:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt eget erat nec tincidunt. Nunc tristique eros venenatis feugiat sagittis. Maecenas vel convallis ex, nec vehicula velit. Sed nec semper mi. Pellentesque vitae sollicitudin tellus. Sed cursus tortor eget tortor ultricies, et suscipit justo interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //     price: 200,
    //     image: "1691795392713.jpeg",
    //   });
    // }
  })
  .catch((err) => console.log(err));
