const {Footer} = require('../models')
const validateFooter = require('../validation/footer.validation')

exports.createFooter = async (req, res) => {
    const { error } = validateFooter(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // req.body dan ma'lumotlarni olish
    const { phone, telegram_email, name } = req.body;

    try {
        // oldin mavjudligini tekshirish
        const existingFooter = await Footer.findOne({
            where: { phone, telegram_email } 
        });

        if (existingFooter) {
            return res.status(400).send({ message: "Bu raqam yoki telegram email oldin yaratilgan!" });
        }

        // yangi footer yaratish
        const footer = await Footer.create({ phone, telegram_email, name });
        res.status(201).send(footer);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



exports.getAllFooter = async (req , res) =>{
    try {
        const footer = await Footer.findAll()
        res.status(200).send(footer)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

exports.getFooterById = async (req, res) =>{
    try {
        const footer = await Footer.findByPk(req.params.id)
        if(!footer) res.status(404).send('Footer not found')
        res.status(200).send(footer)    
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

exports.updateFooter = async (req , res) =>{
    const {error} = validateFooter(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    try {
        const footer = await Footer.findByPk(req.params.id)
        if(!footer) res.status(404).send('User not found')
        await footer.update(req.body)
        res.status(200).send(footer)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}


exports.deleteFooter = async (req, res) =>{
    try {
        const footer = await Footer.findByPk(req.params.id)
        if(!footer) return res.status(404).send('User not found')
        const cardData = footer.toJSON()
        await footer.destroy()
        res.status(200).send(cardData)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}
