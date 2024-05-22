const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');
const { Heroes } = require('../models/MySqlHeroes');
const { Imagenes } = require('../models/MySqlImagenes')

const ImagenesHeroes = bdmysql.define('img_heroes',
    {
        'heroes_id': {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        'imagenes_id': {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        primaryKey: false
    }
);

ImagenesHeroes.belongsTo(Imagenes, { foreignKey: 'imagenes_id', targetKey: 'id' });
ImagenesHeroes.belongsTo(Heroes, { foreignKey: 'heroes_id', targetKey: 'id' });

module.exports = {
    ImagenesHeroes
}
