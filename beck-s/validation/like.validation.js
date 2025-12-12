const Joi = require('joi')

const validationLikes = (like) =>{
    const schema = Joi.object({
        card_id:Joi.number()
    })
    return schema.validate(like)
}

module.exports = validationLikes