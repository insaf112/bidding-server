const jwt = require("jsonwebtoken");

const authenticate = (allowedRoles) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("TOKENNNNNNNNN,........", req.headers, "\n", token, allowedRoles);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Login to Access the data" });
  }

  // Verify token and check role
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, error: "User is Not Authentic" });
    }
    if (!allowedRoles.includes(decoded.role)) {
      return res
        .status(403)
        .json({ success: false, error: "User is not Allowed" });
    }
    req.user = decoded;
    next();
  });
};
module.exports = authenticate;
