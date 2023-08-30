const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
      type: DataTypes.UUID,//* identificador unico universal
      defaultValue: DataTypes.UUIDV4,//* algoritmo que  crea identificadores unicos aleatorios
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,//* valida que se entero
        min: 1,
        max: 5
      },
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    season: {
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),//* ENUM: conjunto de valores permitidos
      allowNull: false,
    }
  });
};