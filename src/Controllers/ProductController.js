const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const { name, images, type, countInStock, price, description, discount } =
      req.body;
    if (!name || !images || !type || !countInStock || !price || !discount) {
      return res.status(403).json({
        status: "ERR",
        message: "Kiểm tra lại thông tin",
      });
    }

    const response = await ProductService.createProduct({
      newProduct: req.body,
    });

    if (!response.data) {
      return res.status(404).json(response);
    }
    return res.status(202).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(403).json({
        status: "ERR",
        message: "Kiểm tra lại thông tin",
      });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(403).json({
        status: "ERR",
        message: "Kiểm tra lại thông tin",
      });
    }
    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(403).json({
        status: "ERR",
        message: "Kiểm tra lại thông tin",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(403).json({
        status: "ERR",
        message: "Kiểm tra lại thông tin",
      });
    }
    const response = await ProductService.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProduct(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getProductType = async (req, res) => {
  const { type } = req.params;
  const { data: allType } = await ProductService.getAllType();
  const isCheckType = allType.includes(type);

  if (type && isCheckType) {
    try {
      const response = await ProductService.getProductType({ type });
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  } else {
    return res.status(404).json({
      message: "Error type products ",
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteMany,
  getAllType,
  getProductType,
};
