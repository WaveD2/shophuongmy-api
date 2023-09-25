const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.get("/search", ProductController.searchProduct);
router.get("/get-all", ProductController.getAllProduct);
router.get("/get-details/:id", ProductController.getDetailsProduct);
// authUserMiddleware,
router.get("/type/:type", ProductController.getProductType);
router.get("/get-all-type", ProductController.getAllType);
router.post("/create", authMiddleware, ProductController.createProduct);
router.post("/delete-many", authMiddleware, ProductController.deleteMany);
router.put("/update/:id", authMiddleware, ProductController.updateProduct);
router.delete("/delete/:id", authMiddleware, ProductController.deleteProduct);

module.exports = router;
