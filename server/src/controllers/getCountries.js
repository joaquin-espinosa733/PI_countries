const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require('sequelize');


const getCountries = async () => {
  const allCountries = await Country.findAll({
    attributes: ['id', 'name', 'flags', 'region', 'capital', 'subregion', 'area', 'population'],
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'duracion', 'season'],
      through: { attributes: [] },//Indica que no desea incluir información de la tabla intermedia que relaciona las tablas de Países y Actividades.
    }
  });
  return allCountries;
};



const getCountrieById = async (id) => {
  const buscarPorId = await Country.findByPk(id, {
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'season', 'duracion'],
    },
  });
  return buscarPorId;
}

const getCountriesByName = async (name) => {
  const buscaElNombre = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`
      },
    },
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "season", "duracion"],
      through: { attributes: [] }
    }
  })
  if(buscaElNombre.length === 0){
    return null;
  }
  return buscaElNombre
}


module.exports = {
  getCountries,
  getCountrieById,
  getCountriesByName
}