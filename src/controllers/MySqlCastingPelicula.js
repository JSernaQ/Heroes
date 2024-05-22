const { response, request } = require('express');
const { bdmysql } = require('../database/MySqlConnection');
const { CastingPelicula } = require('../models/MySqlCastingPeliculas');
const { Heroes } = require('../models/MySqlHeroes')
const { Peliculas } = require('../models/MySqlPeliculas');
const { cast } = require('sequelize');


const castingGet = async (req = request, res = response) => {
    try {
        const castingCompleto = await CastingPelicula.findAll({
            include: [
                { model: Peliculas },
                { model: Heroes }
            ]
        });

        res.json({
            data: castingCompleto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
};



const castingAnGet = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const casting = await CastingPelicula.findByPk(id, {
            include: [
                { model: Peliculas},
                { model: Heroes}
            ]
        }                      
        );

        if (!casting) {
            return res.status(404).json({ok:false,
                msg: 'No existe una casting con el id: ' + id
            })
        }

        res.json({ok:true,data:casting});
    

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}




const castingPost = async (req = request, res = response) => {

    const { personaje, peliculas_id, heroes_id} = req.body;

    const casting = new CastingPelicula({ personaje, peliculas_id, heroes_id});

    try {

        const existeCasting = await CastingPelicula.findOne({ where: { personaje: personaje} });
        
        if (existeCasting) {
            return res.status(400).json({ok:false,
                msg: 'Ya existe un personaje llamada: ' + personaje
            })
        }

        const existeHeroe = await Heroes.findOne({ where: { id: heroes_id} });
        if (!existeHeroe) {
            return res.status(400).json({ok:false,
                msg: 'No existe un heroe con el id: ' + heroes_id
            })
        }

        const existePelicula = await Peliculas.findOne({ where: { id: peliculas_id}})

        if (!existePelicula) {
            return res.status(400).json({ok:false,
                msg: 'No existe una pelicula con el id: ' + peliculas_id
            })
        }

        newCasting = await casting.save();

        casting.id = newCasting.null;

        res.json({ok:true,
            data:casting
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}
/*
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
*/


module.exports = {
    castingGet,
    castingPost,
    castingAnGet
}