const Joi = require('joi')

const validateInfo = (info) =>{
    const schema = Joi.object({
        desc:Joi.string().required().min(5),
    })
    return schema.validate(info)
}

module.exports =  validateInfo