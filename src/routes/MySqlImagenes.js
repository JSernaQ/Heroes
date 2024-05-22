const { Router } = require('express');

const {
    validarJWT,
    esAdminRole
} = require('../middlewares');


const { 
    imagenesGet,
    imagenesPost
} = require('../controllers/MySqlImagenes');

const router = Router();


router.get('/', 
    validarJWT,
    imagenesGet
);



router.post('/', 
    validarJWT, 
    esAdminRole, 
    imagenesPost
);


module.exports = router;