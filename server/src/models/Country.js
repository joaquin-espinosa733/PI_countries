const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags:{
      type: DataTypes.STRING,
      allowNull: false
    },
    region:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subregion:{
      type: DataTypes.STRING,
      allowNull: false
    },
    area:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{
    tableName: 'country', // Especifica el nombre de la tabla
    freezeTableName: true, // Evita que Sequelize pluralice el nombre
  });
};