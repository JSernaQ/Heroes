const { response, request } = require('express');
const { bdmysql } = require('../database/MySqlConnection');
const { ImagenesHeroes } = require('../models/MySqlImgHeroes');
const { Heroes } = require('../models/MySqlHeroes');
const { Imagenes } = require('../models/MySqlImagenes');



const imgHeroesGet = async (req = request, res = response) => {

    const unasImagenes = await ImagenesHeroes.findAll({
        include: [
            {model: Heroes},
            {model: Imagenes}
        ]
    });

    res.json({
        data:unasImagenes
    });

};

const imgHeroesPost = async (req = request, res = response) => {
    
    const {heroes_id, imagenes_id} = req.body;

    const imagenHeroe = new ImagenesHeroes({ heroes_id, imagenes_id });

    try {
        const heroeExiste = await Heroes.findByPk(heroes_id)
        if (!heroeExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un heroes con el id ' + heroes_id
            });
        }

        const imagenExiste = await Imagenes.findByPk(imagenes_id)
        if (!imagenExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe una imagen con el id ' + imagenes_id
            });
        }

        const nuevaImgHeroe = await imagenHeroe.save();

        res.json({
            ok: true,
            data: nuevaImgHeroe
        });

    } catch (error) {
        res.json({
            ok: false,
            msg: 'Comunicate con un administrador'
        });
    }
}

module.exports = {
    imgHeroesGet,
    imgHeroesPost,

};