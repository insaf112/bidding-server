const mongoose = require("mongoose");
const localPath = "mongodb://localhost:27017/biddingDB";
const mongodbPass = "Ecoloot000";
const path = process.env.MONGODB_PATH;
mongoose
  .connect(path)
  .then(() => {
    console.log("MongoDB connected Successfully...");
    console.log("Connection State:", mongoose.connection.readyState);
  })
  .catch((err) => console.log("Error connecting with MongoDB : ", err));
