const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');
const { Heroes } = require('../models/MySqlHeroes')
const { Peliculas } = require('../models/MySqlPeliculas')


const CastingPelicula = bdmysql.define('casting_pelicula',
    {
        'id': {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        'personaje': {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        'peliculas_id': {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        'heroes_id': {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },

    {
        freezeTableName: true,
        timestamps: false 
    }
);

CastingPelicula.belongsTo(Peliculas, { foreignKey: 'peliculas_id', targetKey: 'id' });
CastingPelicula.belongsTo(Heroes, { foreignKey: 'heroes_id', targetKey: 'id' });

module.exports = {
    CastingPelicula,
}
