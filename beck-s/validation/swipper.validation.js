const Joi = require('joi')

const validateSwipper = (swipper) =>{
    const schema = Joi.object({
        desc:Joi.string().required().min(5).max(50),
    })
    return schema.validate(swipper)
}

module.exports =  validateSwipper