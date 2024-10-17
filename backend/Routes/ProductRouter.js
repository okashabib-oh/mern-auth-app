const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router()

router.get('/', ensureAuthenticated, (req, res) => {
    console.log(req.user);
    res.status(200).json([
        { name: 'Chiron Sp +', price: 1000000 },
        { name: 'Divo', price: 200000 }
    ])
})

module.exports = router;