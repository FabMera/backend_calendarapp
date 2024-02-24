const { Router } = require('express');
const { validateFields,checkName,checkEmail,checkPassword } = require('../middlewares/validateFields');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');


router.post('/new', [checkName, checkEmail, checkPassword, validateFields], crearUsuario)
router.post('/', [checkEmail, checkPassword, validateFields], loginUsuario)
router.get('/renew', revalidarToken)

module.exports = router;