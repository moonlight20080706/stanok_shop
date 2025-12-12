const Joi =  require('joi')


const validationCategory = (category) =>{
    const schema = Joi.object({
        cat_name:Joi.string().min(4).max(20).required()
    })
    return schema.validate(category)
} 

module.exports = validationCategory