const { Router } = require('express');
const { 
    imgHeroesGet,
    imgHeroesPost,
} = require('../controllers/MySqlImagenesHeroes')
const {
    validarJWT,
    esAdminRole
} = require('../middlewares')


const router = Router();

router.get('/',
    validarJWT,
    imgHeroesGet
);

router.post('/',
    validarJWT,
    esAdminRole,
    imgHeroesPost
);

module.exports = router