const { DataTypes } = require('sequelize')
const { bdmysql } = require('../database/MySqlConnection')

const Imagenes = bdmysql.define('imagenes',
    {
        'id': {
            type: DataTypes.BIGINT,
            primaryKey: true
        },

        'descripcion': {
            type: DataTypes.TEXT,
            allowNull: false
        },

        'url': {
            type: DataTypes.TEXT,
            allowNull: false
        }

    },
    {
        freezeTableName: true,

        createdAt: false,

        updatedAt: false
    }
);

module.exports = {
    Imagenes
};