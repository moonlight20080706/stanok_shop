const Joi = require("joi");

const validateAdmin = (admin) => {
  const schema = Joi.object({
    ad_name: Joi.string().min(3),
    phone: Joi.string()
      .pattern(/^\+998\d{9}$/)
      .required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });
  return schema.validate(admin);
};

module.exports = {validateAdmin};
