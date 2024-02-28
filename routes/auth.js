const { Router } = require('express');
const { validateFields, checkName, checkEmail, checkPassword } = require('../middlewares/validateFields');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/new', [checkName, checkEmail, checkPassword, validateFields], crearUsuario)
router.post('/', [checkEmail, checkPassword, validateFields], loginUsuario)
router.get('/renew', validarJWT, revalidarToken)

module.exports = router;