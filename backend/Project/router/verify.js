const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied. No Token"
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid Token"
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    
    req.user = decoded;

    next();

  } catch (err) {

    console.log("JWT Error:", err.message);

    return res.status(401).json({
      message: "Invalid Token"
    });

  }
}

module.exports = verifyToken;