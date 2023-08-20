const Joi = require("joi");

const validateData = (data) => {
  const schema = Joi.object({
    fileName: Joi.string().required(),
    content: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = validateData;
