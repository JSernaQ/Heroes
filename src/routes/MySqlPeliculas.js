const { Router } = require('express');
const { validarJWT, esAdminRole} = require('../middlewares');

const {
    peliculasGet,
    peliculasAnGet,
    peliculasPost,
    peliculasPut,
} = require('../controllers/MySqlPeliculas');

const router = Router();

router.get('/', 
    validarJWT,
    peliculasGet
);

router.get('/:id', 
    validarJWT,
    peliculasAnGet
);

router.post('/',
    validarJWT,
    esAdminRole,
    peliculasPost,
);

router.put('/:id',
    validarJWT,
    esAdminRole,
    peliculasPut,
)

module.exports = router;