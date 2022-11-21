const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database connection
const db = mongoose.connection;
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`server running on port ${port}`))
  );

db.on("error", () => console.log("error in connecting to database"));
db.once("open", () => console.log("database connected"));

// routes
app.use("/api/auth", authRoutes);
