const Joi = require('joi')

const validateCard = (card) => {
    const schema = Joi.object({
        title: Joi.string().required().min().max(100),
        desc: Joi.string().required().min(10).max(255),
        price: Joi.string().required(),
        quantity: Joi.string().required(),
        category_id: Joi.number(),
        status: Joi.string().default(''),
    })
    return schema.validate(card)
}

module.exports = validateCard
