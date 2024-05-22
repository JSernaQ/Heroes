const { Router } = require('express');

const {
    validarJWT,
    esAdminRole
} = require('../middlewares');


const { heroesGet,
    heroesPost,
    heroesPut,
    heroesAnGet,
    heroesComoGet,
    heroesDelete,
} = require('../controllers/MySqlHeroe');

const router = Router();


router.get('/', 
    validarJWT, 
    heroesGet  
);

router.get('/:id', 
    validarJWT,
    heroesAnGet
);

router.get('/como/:termino', 
    validarJWT,
    heroesComoGet
);

router.post('/', 
    validarJWT, 
    esAdminRole, 
    heroesPost
);

router.put('/:id', 
    validarJWT, 
    esAdminRole, 
    heroesPut
);


router.delete('/:id',
    validarJWT, 
    esAdminRole, 
    heroesDelete
);



module.exports = router;