const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { connectToDb } = require("./db/db");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

connectToDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/media", express.static("./media"));

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
