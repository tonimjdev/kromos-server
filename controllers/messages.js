const Messages = require('../models/Messages')

// GET all
function getMessages (req, res) {
    Messages.find({}, (err, messages) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if (!messages) return res.status(404).send ({message: `No existen mensajes`})
        
        res.status(200).send({ messages })
        })
}

// Función POST (añade nuevo mensaje a la DB)
function saveMessage (req, res) {
    console.log('POST /api/messages')
    console.log(req.body)
  
    let message = new Messages()
    message.content = req.body.content
    message.sender = req.body.sender
    message.recipient = req.body.recipient
    message.timestamp = req.body.timestamp
  
    message.save((err, messageStored) => {
      if (err) res.status(500).send({message: `Error al guardar en DB: ${err}`})
  
      res.status(200).send({message: messageStored})
    })
}

// EXPORT
module.exports = {
    getMessages,
    saveMessage
}