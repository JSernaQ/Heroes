const { response, request } = require('express');
const { bdmysql } = require('../database/MySqlConnection');
const { Peliculas } = require('../models/MySqlPeliculas');


const peliculasGet = async (req = request, res = response) => {

    const unasPeliculas = await Peliculas.findAll();

    res.json({
        data:unasPeliculas
    });
}

const peliculasAnGet = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const pelicula = await Peliculas.findByPk(id);

        if (!pelicula) {
            return res.status(404).json({ok:false,
                msg: 'No existe una pelicula con el id: ' + id
            })
        }

        res.json({ok:true,data:pelicula});
    

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}

const peliculasPost = async (req = request, res = response) => {
    const { titulo, descripcion, fecha_lanzamiento } = req.body;

    try {
        const existePelicula = await Peliculas.findOne({ where: { titulo: titulo } });

        if (existePelicula) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una película llamada: ' + titulo
            });
        }

        const nuevaPelicula = await Peliculas.create({
            titulo: titulo,
            descripcion: descripcion,
            fecha_lanzamiento: fecha_lanzamiento
        });

        res.json({
            ok: true,
            data: nuevaPelicula
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


const peliculasPut = async (req, res = response) => {

    const { id } = req.params;
    const { body} = req;
   //const { _id, password, google, correo, ...resto } = req.body;

    try {

        const pelicula = await Peliculas.findByPk(id);

        if (!pelicula) {
            return res.status(404).json({ok:false,
                msg: 'No existe una pelicula con el id: ' + id
            })
        }

        console.log(body)
        
        await pelicula.update(body);

        res.json({ok:true,data:pelicula});
    

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}



module.exports = {
    peliculasGet,
    peliculasAnGet,
    peliculasPost,
    peliculasPut,
}