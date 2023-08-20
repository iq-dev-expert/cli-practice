const checkExtention = (fileName) => {
  const EXTENTIONS = ["txt", "html", "css", "js", "json"];

  const extention = fileName.slice(fileName.lastIndexOf(".") + 1);

  const result = EXTENTIONS.some((item) => item === extention);

  return { extention, result };
};

module.exports = checkExtention;
