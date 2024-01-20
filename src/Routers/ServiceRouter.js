const express = require("express");
const router = express.Router();
const ServicesController = require("../Controllers/ServicesController");

router.get("/", ServicesController.getMessagingWebhookFB);
router.post("/", ServicesController.postWebhookFB);

module.exports = router;
