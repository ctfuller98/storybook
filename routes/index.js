const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const List = require('../models/List')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


//@desc  LOGIN/LANDING PAGE
//@route GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout:'login',
    })
})


//@desc DASHBOARD
//@route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const items = await List.find({user:req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            items
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
   
})
//@desc API DOCUMENTATION
//@route GET /api-docs
router.use('/b-lists', require('./b-lists'));
router.use('/api-docs', ensureAuth, swaggerUi.serve);
router.get('/api-docs', ensureAuth, swaggerUi.setup(swaggerDocument));
module.exports = router