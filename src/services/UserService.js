const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        reject({
          status: "ERR",
          message: "Email đã sử dụng",
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hashPassword,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        reject({
          status: "ERR",
          message: "Tài khoản không tồn tại",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        reject({
          status: "ERR",
          message: "Vui lòng kiểm tra lại mật khẩu",
        });
      }
      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
        name: checkUser.name,
        avatar: checkUser.avatar,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Tài khoản không tồn tại",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Tài khoản không tồn tại",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Xóa tài khoản thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids });

      resolve({
        status: "OK",
        message: "Xóa tài khoản thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: "OK",
        message: "Success",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        // id : email user send or id
        $or: [{ _id: id }, { email: id }],
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "Tài khoản không tồn tại",
        });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const checkEmailInData = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        email: email,
      });

      if (user === null) {
        resolve({
          status: "ERR",
          message: "Tài khoản không tồn tại",
        });
      }
      const access_token = await generalAccessToken({
        email: user.email,
        isAdmin: user.isAdmin,
      });

      const refresh_token = await generalRefreshToken({
        email: user.email,
        isAdmin: user.isAdmin,
      });

      resolve({
        status: 200,
        message: "Success",
        data: { refresh_token, access_token, user },
      });
    } catch (e) {
      reject(e);
    }
  });
};
const createAccRefresh_Token = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const access_token = await generalAccessToken({
        email: data?.email,
      });

      const refresh_token = await generalRefreshToken({
        email: data?.email,
      });
      const newUser = await User.create({
        name: data?.displayName,
        email: data?.email,
        isAdmin: false,
        avatar: data?.photoURL,
      });

      resolve({
        status: 200,
        message: "Success",
        data: { refresh_token, access_token, newUser },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  deleteManyUser,
  checkEmailInData,
  createAccRefresh_Token,
};
