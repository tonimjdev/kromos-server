const { Router } = require('express');
const { viewAllUsers, getUser, updateUser } = require('../controllers/user');

const router = Router();

//Ver todos los usuarios
router.get( '/', viewAllUsers );

// Buscar usuario por ID
router.get('/:userId', getUser);

// Actualizar User por ID
router.put('/:userId', updateUser);

module.exports = router;