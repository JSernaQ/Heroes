const { response } = require("express");
const { ConnectionRefusedError } = require("sequelize");
const { UsuarioPamii } = require("../models/MySqlUsuario");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req, res = response) => {

    const { correo, password } = req.body;
    
    var condition = { where: { correo: correo } };


    try {

        // Verificar si el email existe
        const usuario = await UsuarioPamii.findOne(condition);
        if (!usuario) {
            return res.status(400).json({ok:false,
                msg: 'Usuario / Password no son correctos - correo: ' + correo
            })
        }

        // Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({ok:false,
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        const validaPassword = bcryptjs.compareSync( password, usuario.password );
        // Verificar la contraseña

        if (!validaPassword) {
            return res.status(400).json({ok:false,
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok:true,
            msg: 'Login ok',
            uid: usuario.id,
            bpid:usuario.brandProviderId,
            role:usuario.rol,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ok:false,
            msg: 'Hable con el Administrador...'
        })


    }

}

const register = async (req, res = response) => {

    const { nombre, correo, password} = req.body;
    const rol = 'USER_ROLE'

    const usuario = new UsuarioPamii({ nombre, correo, password, rol});

    try {

        const existeCorreo = await UsuarioPamii.findOne({ where: { correo: correo } });

        if (existeCorreo) {
            return res.status(400).json({ok:false,
                msg: 'Ya existe un usuario con el correo: ' + correo
            })
        }

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar en BD
        await usuario.save();

        res.json({ok:true,
            data:usuario
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
    login,
    register,
}