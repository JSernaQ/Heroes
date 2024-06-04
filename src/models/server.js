const express = require('express')
const { connectDB } = require('../database/MongoConnection')
const cors = require('cors')
const { M } = require('../database/MongoConnection')

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.app.use(express.json());
        
        this.pathsMySql = {
            auth: '/auth',
            usuarios: '/usuarios',
            heroes: '/heroes',
            peliculas: '/peliculas',
            castings: '/castings',
            imagenes: '/imagenes',
            imgHereoes: '/imagenesheroes'
        }



        /*
        this.app.get('/', function (req, res) {
            res.send('Hola Mundo a todos...')
        })
        */

        //Aqui me conecto a la BD
        this.dbConnection();

        //Middlewares
        this.middlewares();


        //Routes
        this.routes();

    }

    async dbConnection() {
        try {
            await connectDB()
            .then(console.log('Successful DB connection'));
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }

    routes() {
        this.app.use(this.pathsMySql.auth, require('../routes/MySqlAuth'));
        this.app.use(this.pathsMySql.usuarios, require('../routes/MySqlUsuarios'));
        this.app.use(this.pathsMySql.heroes, require('../routes/MySqlHeroe'));
        this.app.use(this.pathsMySql.peliculas, require('../routes/MySqlPeliculas'));
        this.app.use(this.pathsMySql.castings, require('../routes/MySqlCastingPeliculas'));
        this.app.use(this.pathsMySql.imagenes, require('../routes/MySqlImagenes'));
        this.app.use(this.pathsMySql.imgHereoes, require('../routes/MySqlImagenesHeroes'));
    }

    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());

        //Lectura y Parseo del body
        //JSON
        /*
        JSON (JavaScript Object Notation) 
        es un formato ligero de intercambio de datos. 
        JSON es de fácil lectura y escritura para los usuarios. 
        JSON es fácil de analizar y generar por parte de las máquinas. 
        JSON se basa en un subconjunto del lenguaje de programación JavaScript, 
        Estándar ECMA-262 3a Edición - Diciembre de 1999.
        */
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

    }

    

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;


