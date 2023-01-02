const Messages = require('../models/Messages')

// GET all
function getMessages (req, res) {
    Messages.find({}, (err, messages) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if (!messages) return res.status(404).send ({message: `No existen mensajes`})
        
        res.status(200).send({ messages })
        })
}

// GET by Sender
function getSender(req, res) {
    let sender =  req.query.sender;

    Messages.find({ sender: sender }, (err, messages) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if (!messages) return res.status(404).send ({message: `No existen mensajes`})
        
        res.status(200).send({ messages }) 
    }).sort({timestamp:1});
}

// GET by Recipient
function getRecipient(req, res) {
    let recipient =  req.query.recipient;

    Messages.find({ recipient: recipient }, (err, messages) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if (!messages) return res.status(404).send ({message: `No existen mensajes`})
        
        res.status(200).send({ messages }) 
    }).sort({timestamp:1});
}

// GET by Sender & Recipient
function getSendRec(req, res) {
    let sender =  req.query.sender;
    let recipient = req.query.recipient;

    Messages.find({ sender: sender, recipient: recipient }, (err, messages) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if (!messages) return res.status(404).send ({message: `No existen mensajes`})
        
        res.status(200).send({ messages }) 
    }).sort({timestamp:1});

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
    message.read = req.body.read
  
    message.save((err, messageStored) => {
      if (err) res.status(500).send({message: `Error al guardar en DB: ${err}`})
  
      res.status(200).send({message: messageStored})
    })
}

// Funcion PUT (para modificar estado READ a true cuando se lee el mensaje)
function updateMessage(req, res) {
    let messageId = req.params.messageId
    let update = req.body

    Messages.findByIdAndUpdate(messageId, update, (err, messageUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar mensaje ${err}`})
    
        res.status(200).send({ message: messageUpdated })
    })
}

// EXPORT
module.exports = {
    getMessages,
    getSender,
    getRecipient,
    getSendRec,
    saveMessage,
    updateMessage
}