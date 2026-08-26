const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const pool = require("../db");

const router = express.Router();
// resgister user

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length > 0) {
      return res.json({
        message: "Email Already Exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users(name, email, password, department) VALUES($1, $2, $3, $4)",
      [name, email, hashedPassword, department]
    );

    res.json({
      message: "User Registered Successfully"
    });

  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});
// Login user

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({
        message: "Invalid Email"
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login Successful",
      token: token
    });

  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;