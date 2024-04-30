require("dotenv").config({ debug: true });
const express = require("express");
const cors = require("cors");
const path = require("path");
const IndexRoutes = require("./routes/IndexRoutes");
const app = express();

app.use(express.json({ limit: "500mb" }));
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specified HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specified headers
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
require("./config/db");

app.use("/api", IndexRoutes);
// app.get("/", (req, res) => {
//   res.send("<h1>Hello There</h1>");
// });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening at localhost ${port}....`);
});
