const Sequelize = require('sequelize')
const sequelize = require('../configs/database')

const Admin = require('./admin.model')(sequelize, Sequelize)
const Card = require('./card.model')(sequelize, Sequelize)
const Category = require('./category.model')(sequelize, Sequelize)
const Footer = require('./footer.model')(sequelize, Sequelize)
const Swipper = require('./swipper.model')(sequelize, Sequelize)
const Info = require('./info.model')(sequelize, Sequelize)
const Order = require('./order.model')(sequelize, Sequelize)

Card.associate(sequelize.models)
Admin.associate(sequelize.models)
Category.associate(sequelize.models)

module.exports = {Admin, Card, Category, Footer, Swipper, Info, Order, sequelize}