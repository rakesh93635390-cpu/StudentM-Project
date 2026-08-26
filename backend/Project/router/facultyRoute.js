const express = require("express");
const router = express.Router();

const pool = require("../db");
const bcrypt = require("bcrypt");
const verifyToken = require("./verify");

// ================= MY PROFILE =================
router.get("/profile", verifyToken, async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT id, name, email, role, department
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

// ======= Change Password =========

router.put("/change-password", verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current Password and New Password are required"
      });
    }

    // Get logged-in user's password
    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    // Check current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      result.rows[0].password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current Password is Wrong"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update only logged-in user's password
    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, req.user.id]
    );

    res.json({
      message: "Password Changed Successfully"
    });

  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;