const { response, request } = require('express');
const { bdmysql } = require('../database/MySqlConnection');
const {  Heroes } = require('../models/MySqlHeroes');
const { body } = require('express-validator');


const heroesGet = async (req = request, res = response) => {

    const unosHeroes = await Heroes.findAll();

    res.json({
        data:unosHeroes
    });
}


const heroesAnGet = async (req = request, res = response) => {

    const { id } = req.params;
   //const { _id, password, google, correo, ...resto } = req.body;

    try {

        const heroe = await Heroes.findByPk(id);

        if (!heroe) {
            return res.status(404).json({ok:false,
                msg: 'No existe un heroe con el id: ' + id
            })
        }

        res.json({ok:true,data:heroe});
    

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}

const heroesComoGet = async(req = request, res = response) => {

    const { termino } = req.params;

    try {
        const [results, metadata] = await bdmysql.query(
            "SELECT *" +
            " FROM heroes" +
            " WHERE nombre like '%" + termino + "%'" +
            " ORDER BY nombre"
        );

        res.json({ok:true,
            data: results,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error

        /*
        res.json({
            msg: "post API - usuariosPost",
            err: error,
            //            nombre,
            //            edad
            */
        });
    }
};



const heroesPost = async (req, res = response) => {

    const { nombre, bio, img, aparicion , casa} = req.body;
    
    const heroe = new Heroes({ nombre, bio, img, aparicion, casa });

    try {

        const existeHeroe = await Heroes.findOne({ where: { nombre: nombre} });

        if (existeHeroe) {
            return res.status(400).json({ok:false,
                msg: 'Ya existe un Heroe llmado' + nombre
            })
        }

        // Encriptar la contraseña
        //const salt = bcryptjs.genSaltSync();
        //usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar en BD
        newHeroe = await heroe.save();

        //console.log(newHeroe.null);
        //Ajusta el Id del nuevo registro al Heroe
        heroe.id = newHeroe.null;

        res.json({ok:true,
            data:heroe
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}


const heroesPut = async (req, res = response) => {

    const { id } = req.params;
    const { body} = req;
   //const { _id, password, google, correo, ...resto } = req.body;

    console.log(id);
    console.log(body);

    //var condition = { where :{id: id} };

    try {

        const heroe = await Heroes.findByPk(id);

        if (!heroe) {
            return res.status(404).json({ok:false,
                msg: 'No existe un heroe con el id: ' + id
            })
        }


        /*
        if ( body.password ) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync( body.password, salt );
        }
        */

        console.log(body)
        
        await heroe.update(body);

        res.json({ok:true,data:heroe});
    

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}

/*
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}
*/

const heroesDelete = async (req, res = response) => {
    const { id } = req.params;
   //const { _id, password, google, correo, ...resto } = req.body;

    //const uid = req.uid;

    console.log(id);
 
    var condition = { where :{id: id} };

    try {

        const heroe = await Heroes.findByPk(id);
        //const usuarioAutenticado = req.usuario;

        if (!heroe) {
            return res.status(404).json({ok:false,
                msg: 'No existe un heroe con el id: ' + id
            })
        }

        await heroe.destroy();

        res.json({
            ok:true,
            msg:'Eliminado correctamente!'
        });
    

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}


module.exports = {
    heroesGet,
    heroesAnGet,
    heroesComoGet,
    heroesPut,
    heroesPost,
    heroesDelete,
}