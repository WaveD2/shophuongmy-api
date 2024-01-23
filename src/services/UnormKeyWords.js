const unorm = require("unorm");

const UnormKeyWords = async (keyword) => {
  try {
    let keyByUnorm = unorm
      .nfd(keyword)
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return keyByUnorm;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  UnormKeyWords,
};
