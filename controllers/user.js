const { response } = require("express");
const Usuario = require("../models/Usuario");

const viewAllUsers = async (req, res = response) => {

    try {
        const all = await Usuario.find({});
        res.send(all);
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: "No users found" 
        });
    }
    
};

// GET by ID
function getUser (req, res) {
    let userId = req.params.userId

    Usuario.findById(userId, (err, user) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la petición ${err}`
        })
        if (!user) return res.status(404).send ({
            message: `El usuario no existe`
        })

        res.status(200).send({ user })
    })
}

// PUT by ID
function updateUser (req, res) {
    let userId = req.params.userId
    let update = req.body

  Usuario.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el usuario ${err}`})

    res.status(200).send({ user: userUpdated })
  } )
}

module.exports = { viewAllUsers, getUser, updateUser };
