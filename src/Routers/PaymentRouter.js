const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.get("/config", (req, res) => {
  return res.status(200).json({
    status: "OK",
    data:
      process.env.CLIENT_ID ||
      "Ae63CQqMZOtWwCOm4HmikOj_X_tQShe45uXLYjsn9JNvjoPeOFJqeuIBR6yOQuXa1SMs0g5u_6dbytpf",
  });
});

module.exports = router;
