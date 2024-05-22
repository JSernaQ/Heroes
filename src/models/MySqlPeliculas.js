const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const Peliculas = bdmysql.define('peliculas',
    {
        'id': {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        'titulo': {
            type: DataTypes.STRING,
            allowNull: false
        },

        'descripcion': {
            type: DataTypes.TEXT,
            allowNull: false
        },

        'fecha_lanzamiento': {
            type: DataTypes.DATE,
        },

    },

    {
        freezeTableName: true,

        createdAt: false,

        updatedAt: false
    }
);


module.exports = {
    Peliculas,
}