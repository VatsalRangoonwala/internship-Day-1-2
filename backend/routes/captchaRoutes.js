const express = require("express");
const router = express.Router();

// Generate captcha
router.get("/generate", (req, res) => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;

  // store answer in session
  req.session.captchaAnswer = num1 + num2;

  res.json({
    num1,
    num2
  });
});

// Verify captcha
router.post("/verify", (req, res) => {
  const { userAnswer } = req.body;

  if (Number(userAnswer) === req.session.captchaAnswer) {
    return res.json({
      success: true,
      message: "Captcha verified"
    });
  }

  res.status(400).json({
    success: false,
    message: "Invalid captcha"
  });
});

module.exports = router;
