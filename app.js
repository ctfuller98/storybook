const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const connect = require('./config/db')
const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
//Load Config
dotenv.config({path: './config/config.env'})

//Passport Config
require('./config/passport')(passport)

connect.connectDB()

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

//Sessions 
app.use(
    session({
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    
}))

//Passport Middleware 
app.use(passport.initialize())
app.use(passport.session())
//Static Folder 
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

