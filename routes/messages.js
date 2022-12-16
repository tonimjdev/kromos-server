const express = require('express')
const messagesCtrl = require('../controllers/messages')
const router = express.Router()

// GET
router.get('/messages', messagesCtrl.getMessages)

// GET by sender & recipient
router.get('/messages/sendrec', messagesCtrl.getSendRec)
// POST
router.post('/messages', messagesCtrl.saveMessage)

module.exports = router