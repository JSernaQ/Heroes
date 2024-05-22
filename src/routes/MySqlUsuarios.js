const { Router } = require('express');

const {
    validarCampos,
    validarJWTMySQL,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
    usuariosAnGet
} = require('../controllers/MySqlUsuarios');

const router = Router();


router.get('/', 
validarJWTMySQL,
esAdminRole,
usuariosGet);

router.get('/:id',
validarJWTMySQL,
esAdminRole,
usuariosAnGet);

router.post('/', 
validarJWTMySQL, //Midlleware para el Tokens
esAdminRole, //Midlewara para validar el Role
usuariosPost);

router.put('/:id', 
validarJWTMySQL, //Midlleware para el Tokens
esAdminRole, //Midlewara para validar el Role
usuariosPut);

router.delete('/:id',
validarJWTMySQL, //Midlleware para el Tokens
esAdminRole, //Midlewara para validar el Role
usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;