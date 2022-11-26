const { response } = require("express");
//const { validationResult } = require('express-validator');
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");


// NEW USER
const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body;

  try {
    // Verificar el email
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "The user already exists with that email",
      });
    }

    // Crear usuario con el modelo
    const dbUser = new Usuario(req.body);

    // Hashear (encriptar) la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.name);

    // Crear usuario de DB
    await dbUser.save();

    // Generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};


// LOGIN USER
const loginUsuario = async (req, res = response) => {
  /*   const errors = validationResult( req );
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    } */

  const { email, password } = req.body;

  try {
    const dbUser = await Usuario.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "The email does not exist",
      });
    }

    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.name);

    // Respuesta del servicio
    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Contact the administrator",
    });
  }
};


// REVALIDAR TOKEN
const revalidarToken = async (req, res = response) => {

    const { uid } = req;

    // Leer base de datos para obtener email
    const dbUser = await Usuario.findById(uid);



    // Generar el JWT
    const token = await generarJWT( uid, dbUser.name );
    
  return res.json({
    ok: true,
    uid,
    name: dbUser.name,
    email: dbUser.email,
    token
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
