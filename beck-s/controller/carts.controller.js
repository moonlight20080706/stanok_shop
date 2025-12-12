const {Carts, Card} = require('../models')
const cartsValidation = require('../validation/carts.valdation')

exports.postCarts = async (req , res) =>{
    const {error} = cartsValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    try {
        const carts = await Carts.create(req.body)
        // if(carts) res.status(400)
        res.status(200).send(carts)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

exports.getCarts = async (req , res) =>{
    try {
        // const carts =await Carts.findAll()
        const carts = await Carts.findAll({
            include: [
                {
                model: Card,
                as: 'carts_card'
    }
  ]
});

        res.status(200).send(carts)
    } catch (error) {
        res.status(500).send({message:error.message})
    }

}




exports.deleteCarts = async (req , res) =>{
    try {
        const carts = await Carts.findByPk(req.params.id)
        if(!carts) return res.status(400).send('Cart not found')
        const cartsData = carts.toJSON()
        await carts.destroy()
        res.status(200).send(cartsData)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}