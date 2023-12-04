const Product = require("../Model/ProductModel");

const createProduct = ({ newProduct }) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      images,
      type,
      countInStock,
      price,
      description,
      discount,
      color,
      size,
      isStatus,
    } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "Tên sản phẩm này đã có",
        });
      }
      const newProduct = await Product.create({
        name,
        images,
        type,
        countInStock: Number(countInStock),
        price: Number(price),
        description,
        discount: Number(discount),
        color,
        size,
        isStatus,
      });

      if (newProduct) {
        resolve({
          status: "OK",
          message: "Thành công",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "Sản phẩm không tồn tại",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "Không tìm thấy sản phẩm",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Xóa sản phẩm thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Xóa sản phẩm thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        reject({
          status: "ERR",
          message: "Sản phẩm không tồn tại",
        });
      }

      resolve({
        status: "OK",
        message: "Success",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, discount, price, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      const limit = 12;
      const skip = (page - 1) * limit;

      // get product default all
      if (!discount && !price && !filter) {
        const allObject = await Product.find().skip(skip).limit(limit);

        resolve({
          status: "OK",
          data: allObject,
          totalDefault: totalProduct,
          totalProductCurrent: allObject?.length,
          page: page,
          totalPage: Math.round(totalProduct / limit),
        });
      }
      //get product search
      if (filter && !price && !discount) {
        let nameLabel = filter[0];

        const allObjectFilter = await Product.find({
          [nameLabel]: { $regex: filter[1], $options: "i" },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          totalDefault: totalProduct,
          totalProductCurrent: allObjectFilter.length,
          pageCurrent: Number(page + 1),
          totalPage: Math.round(totalProduct / limit),
        });
      }
      // get all product sort
      else if (price || (discount && !filter)) {
        let query = {};
        if (price) {
          const [minPrice, maxPrice] = price.split("-");

          query.price = {
            $gte: parseFloat(minPrice),
            $lte: parseFloat(maxPrice),
          };

          if (discount) {
            const [minDiscount, maxDiscount] = discount.split("-");
            query.discount = {
              $gte: parseFloat(minDiscount),
              $lte: parseFloat(maxDiscount),
            };
          }
        } else if (!price && discount) {
          const [minDiscount, maxDiscount] = discount.split("-");
          query.discount = {
            $gte: parseFloat(minDiscount),
            $lte: parseFloat(maxDiscount),
          };
        }

        const allProductSort = await Product.find(query)
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allProductSort,
          totalDefault: totalProduct,
          totalProductCurrent: allProductSort.length,
          pageCurrent: Number(page),
          totalPage: Math.round(totalProduct / limit),
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getProductType = ({ type, page }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.find({ type: { $in: type } });
      const limit = 12;
      const skip = (+page - 1) * limit;

      const allProductType = await Product.find({ type: { $in: type } })
        .skip(skip)
        .limit(limit)
        .sort({
          createdAt: -1,
          updatedAt: -1,
        });
      resolve({
        status: "OK",
        data: allProductType,
        totalDefault: totalProduct.length,
        totalProductCurrent: allProductType?.length,
        page: +page,
        totalPage: Math.round(totalProduct.length / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType,
  getProductType,
};
