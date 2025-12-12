const Joi = require('joi')

const validateCard = (card) => {
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(100),
        desc: Joi.string().required().min(10).max(255),
        price: Joi.string().required(),
        quantity: Joi.number().required(),
        category_id: Joi.number(),
        price: Joi.string().required(),
    })
    return schema.validate(card)
}

module.exports = validateCard
