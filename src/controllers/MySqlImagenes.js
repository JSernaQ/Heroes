const { response, request } = require('express');
const { bdmysql } = require('../database/MySqlConnection');
const { Imagenes } = require('../models/MySqlImagenes');


const imagenesGet = async(req = request, res = response) => {

    const unasImagenes = await Imagenes.findAll()

    res.json({
        data:unasImagenes
    })
}

const imagenesPost = async (req = request, res = response) => {
    const { descripcion, url } = req.body;

    const imagen = new Imagenes({ descripcion, url });

    try {
        const nuevaImagen = await imagen.save();

        res.json({
            ok: true,
            data: nuevaImagen
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message
        });
    }
};


module.exports = {
    imagenesGet,
    imagenesPost,
}