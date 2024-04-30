const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const createToken = (data) => {
  return jwt.sign({ ...data }, jwtSecret, { expiresIn: "30d" });
};
const verifyToken = async (token) => {
  const verify = await jwt.verify(token, jwtSecret);
  console.log("VERIFIEDDDDD : ", verify);
  return verify ? true : false;
};

module.exports = { createToken, verifyToken };
