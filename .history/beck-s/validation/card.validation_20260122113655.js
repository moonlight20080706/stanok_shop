const Joi = require('joi')

const validateCard = (card) => {
    const schema = Joi.object({
        title: Joi.string().required().min(2).max(100),
        desc: Joi.string().required().min(8).max(255),
        price: Joi.string().required(),
        quantity: Joi.string().required(),
        category_id: Joi.number(),
        status: Joi.string().default(''),
        currency: Joi.string().valid('UZS', 'USD'),,
    })
    return schema.validate(card)
}

module.exports = validateCard
