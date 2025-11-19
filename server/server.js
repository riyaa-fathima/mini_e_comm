const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/userRouter");
const productRoutes = require("./routes/productRouter");
const cartRoutes = require("./routes/cartRouter");

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API is running....");
});
app.use("/users", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
