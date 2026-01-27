const express = require('express')
const cors = require('cors')
const setupSwagger = require('./swagger/swagger');
const {sequelize} = require('./models');
require('dotenv').config();require("dotenv").config();
console.log("JWT_TOKEN:", process.env.JWT_TOKEN);
// const TelegramBot = require("node-telegram-bot-api"); // ✅ to‘g‘rilangan qator


const admin = require('./routes/addmin.routes')
const card = require('./routes/card.routes')
const category = require('./routes/category.routes')
const swipper = require('./routes/swipper.routes')
const footer = require('./routes/footer.routes')
const info = require('./routes/info.routes')
const app = express();
const path = require('path')





// app.use(express.json());
app.use(express.json({ limit: "10mb" }));       // JSON body uchun
app.use(express.urlencoded({ limit: "10mb", extended: true })); // form data uchun

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname,"uploads")));

// Swagger UI setup
setupSwagger(app);

//Routes
app.use('/api', admin )
app.use('/api', card )
app.use('/api', category )
app.use('/api', footer )
app.use('/api', swipper )
app.use('/api', info )

const PORT = process.env.PORT || 7070;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});
