const Kromos = require('../models/Kromos')

// GET by ID
function getKromo (req, res) {
    let kromoId = req.params.kromoId

    Kromos.findById(kromoId, (err, kromo) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la petición ${err}`
        })
        if (!kromo) return res.status(404).send ({
            message: `El cromo no existe`
        })

        res.status(200).send({ kromo })
    })
}
// GET all
function getKromos (req, res) {
    Kromos.find({}, (err, kromos) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if (!kromos) return res.status(404).send ({message: `No existen cromos`})
        
        res.status(200).send({ kromos })
        })
}


// Función POST (añade nuevo producto a la DB)
function saveKromo (req, res) {
    console.log('POST /api/kromos')
    console.log(req.body)
  
    let kromo = new Kromos()
    kromo.id_kromo = req.body.id_kromo
    kromo.lo_tienen = req.body.lo_tienen
  
    kromo.save((err, kromoStored) => {
      if (err) res.status(500).send({message: `Error al guardar en DB: ${err}`})
  
      res.status(200).send({kromo: kromoStored})
    })
}



// PUT
function updateKromo (req, res) {
    let kromoId = req.params.kromoId
    let update = req.body

  Kromos.findByIdAndUpdate(kromoId, update, (err, kromoUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el cromo ${err}`})

    res.status(200).send({ kromo: kromoUpdated })
  } )
}

// EXPORT
module.exports = {
    getKromo,
    getKromos,
    saveKromo,
    updateKromo
}