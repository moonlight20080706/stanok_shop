const {Like, Card} = require('../models')
const likeValidation = require('../validation/like.validation')

exports.postLike = async (req , res) =>{
    // const {error} = likeValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message)
    try {
        const user_id = req.user.id;
        const oldLike = await Like.findOne({
            where: {product_id: req.body.product_id, user_id}
        })
        if(oldLike){
            await oldLike.destroy();
            return res.status(200).json({success: true, message: 'Product disliked'})
        }else{
            await Like.create({
                product_id: req.body.product_id,
                user_id  
            })
        }
        // if(like) res.status(400)
        return res.status(201).send({success: true, message: 'product liked'})
    } catch (error) {
        console.error(error)
        res.status(500).send({message:error.message})
    }
}

exports.getLikes = async (req , res) =>{
    try {
        // const like =await Like.findAll()
        const like = await Like.findAll({
            include: [
                {
                model: Card,
                as: 'likes_card'
    }
  ]
});

        res.status(200).send(like)
    } catch (error) {
        res.status(500).send({message:error.message})
    }

}




exports.deleteLike = async (req , res) =>{
    try {
        const like = await Like.findByPk(req.params.id)
        if(!like) return res.status(400).send('Cart not found')
        const likesData = like.toJSON()
        await like.destroy()
        res.status(200).send(likesData)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}