const Joi = require('joi');

const validateFooter = (footer) => {
    const schema = Joi.object({
        phone: Joi.string()
                  .required()
                  .pattern(/^\+998\d{9}$/),  // RegExp to'g'ri formatda
        telegram_email: Joi.string(),
        name:Joi.string().required()
    });
    return schema.validate(footer);
};

module.exports = validateFooter;
