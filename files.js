const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const checkExtention = require("./helpers/checkExtention");

const validateData = require("./helpers/dataValidator");

const createFile = async (fileName, content) => {
  const file = { fileName, content };

  const { error } = validateData(file);

  if (error) {
    console.log(chalk.red(`Please specify ${error.details[0].message}`));
    return;
  }

  const { extention, result } = checkExtention(fileName);

  if (!result) {
    console.log(
      chalk.red(`Sorry this app doesnt support with ${extention} extention`)
    );
    return;
  }

  try {
    const filePath = path.join(__dirname, "./files", fileName);
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green(`File create success ${fileName}`));
  } catch (error) {
    console.log(error);
  }
};

const getFile = async () => {
  const folderPath = path.join(__dirname, "./files");
  const data = await fs.readdir(folderPath);

  data.length === 0
    ? console.log(chalk.red(`Folder is empty`))
    : console.log(data);
};

const getInfo = async (fileName) => {
  const folderPath = path.join(__dirname, "./files");
  const data = await fs.readdir(folderPath);

  const result = data.find((value) => {
    return value === fileName;
  });

  if (!result) {
    console.log(chalk.red(`File is not exist in folder`));
  } else {
    const filePath = path.join(__dirname, `./files/${fileName}`);
    const dataFile = await fs.readFile(filePath, "utf-8");
    console.log(dataFile);
  }
};

module.exports = {
  createFile,
  getFile,
  getInfo,
};
