const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../Controllers/UserController");

const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/auth/emailGG", userController.checkGmailGG);
router.post("/auth/token", userController.createAccRefresh_Token);

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.put("/update-user/:id", authUserMiddleware, userController.updateUser);
router.delete(
  "/delete-user/:id",
  authUserMiddleware,
  userController.deleteUser
);
router.get("/getAll", authMiddleware, userController.getAllUser);
router.get(
  "/get-detail/:id",
  authUserMiddleware,
  userController.getDetailsUser
);
router.post("/refresh-token", userController.refreshToken);
router.post("/delete-many", authMiddleware, userController.deleteMany);

module.exports = router;
