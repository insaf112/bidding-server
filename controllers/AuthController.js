const UserModel = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

const createToken = (data) => {
  return jwt.sign({ ...data }, jwtSecret, { expiresIn: "30d" });
};
const verifyToken = async (token) => {
  const verify = await jwt.verify(token, jwtSecret);
  console.log("VERIFIEDDDDD : ", verify);
  return verify ? true : false;
};

class AuthController {
  Register = async (req, res) => {
    console.log("User", req.body);
    const { email, password, name } = req.body;
    try {
      if (!email || !password || !name)
        throw new Error("All fields Must be Filled");
      const userExists = await UserModel.findOne({ email });
      if (!userExists) {
        // Hash Password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        console.log("PASSWORD : ", hashPassword, saltRounds);
        await UserModel.create({
          ...req.body,
          password: hashPassword,
        });
        res.status(201).json({
          success: true,
          data: { message: "User Registered Successfully", data: null },
        });
      } else {
        throw new Error("User Already Registered");
      }
    } catch (error) {
      console.log("Error : ", error, saltRounds);
      res.status(400).json({ success: false, error: error.message });
    }
  };

  // Login User
  Login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Req.headers : ", req.body, req.headers);
    try {
      if (!email || !password) throw new Error("All fields Must be Filled");
      const userExists = await UserModel.findOne({ email });
      if (!userExists) {
        throw new Error("Invalid Credentials");
      } else {
        // Match Passwords
        const matched = await bcrypt.compare(password, userExists.password);
        if (!matched) {
          throw new Error("Invalid Credentials");
        }
        const token = await createToken({
          email: userExists.email,
          id: userExists._id,
          role: userExists.role,
        });
        res.status(200).json({
          success: true,
          data: {
            message: "Login Success",
            data: { user: userExists, token: token },
          },
        });
      }
    } catch (error) {
      console.log("Error : ", error);
      res.status(400).json({ success: false, error: error.message });
    }
  };
}

module.exports = new AuthController();
