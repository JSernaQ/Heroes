const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/MySqlAuth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/login',[
    check('sa','mal').isStrongPassword,
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/register',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], register);

module.exports = router;
