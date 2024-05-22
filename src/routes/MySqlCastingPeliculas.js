const { Router } = require('express');

const {
    validarJWT,
    esAdminRole
} = require('../middlewares');


const { castingGet,
    castingPost,
    castingAnGet
} = require('../controllers/MySqlCastingPelicula');

const router = Router();


router.get('/', 
    validarJWT,
    castingGet
);

router.get('/:id',
    validarJWT,
    castingAnGet
)

router.post('/', 
    validarJWT, 
    esAdminRole, 
    castingPost
);


module.exports = router;