const express = require('express')
const messagesCtrl = require('../controllers/messages')
const router = express.Router()

// GET
router.get('/messages', messagesCtrl.getMessages)
// GET by Sender
router.get('/messages/sender', messagesCtrl.getSender)
// GET by Recipient
router.get('/messages/recipient', messagesCtrl.getRecipient)
// GET by Sender & Recipient
router.get('/messages/sendrec', messagesCtrl.getSendRec)
// POST
router.post('/messages', messagesCtrl.saveMessage)

module.exports = router