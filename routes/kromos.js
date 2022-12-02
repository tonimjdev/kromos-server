const express = require('express')
const kromosCtrl = require('../controllers/kromos')
const router = express.Router()

// GET
router.get('/kromos', kromosCtrl.getKromos)
router.get('/kromos/:kromoId', kromosCtrl.getKromo)
// POST
router.post('/kromos', kromosCtrl.saveKromo)
// PUT
router.put('/kromos/:kromoId', kromosCtrl.updateKromo)

module.exports = router