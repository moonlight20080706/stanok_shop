const Joi = require('joi')

const validationCarts = (carts) =>{
    const schema = Joi.object({
        card_id:Joi.number()
    })
    return schema.validate(carts)
}

module.exports = validationCarts