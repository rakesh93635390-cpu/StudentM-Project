const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const facultyRouter = require("./router/facultyRoute");
const studentRouter = require('./router/studentRoute');
const authRouter = require("./router/authRoute");
const verifyToken = require("./router/verify");

// Route Section
app.use("/api", studentRouter);

app.use("/api/auth", authRouter);

app.use("/api/faculty", facultyRouter);

// Admin Authorization
function checkAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access Denied"
    });
  }

  next();
}

app.get("/admin", verifyToken, checkAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});