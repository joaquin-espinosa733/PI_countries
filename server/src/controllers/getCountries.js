const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require('sequelize');


const getCountries = async () => {
  //* buscamos en la tabla country de mi base de datos los attributes requeridos:
  const allCountries = await Country.findAll({
    attributes: ['id', 'name', 'flags', 'region', 'capital', 'subregion', 'area', 'population'],
    //* y que tambien incluya los attributes de mi tabla de activity:
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'duracion', 'season'],
      through: { attributes: [] },//* Indica que no desea incluir información de la tabla intermedia que relaciona las tablas de Países y Actividades.
    }
  });
  return allCountries;
};



const getCountrieById = async (id) => {
  //* hacemos una busqueda con findByPk para buscar la primary key en este caso la ID
  const buscarPorId = await Country.findByPk(id, {
    //* incluimos los attributes de mi tabla "Activity"
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'season', 'duracion'],
    },
  });
  return buscarPorId;
}

const getCountriesByName = async (name) => {
  //* buscamos por name en nuestra DB
  const buscaElNombre = await Country.findAll({
    where: {
      name: {
        //* busqueda de cadena insensible a mayusculas y minusculas(case-insentive) en la DB
        //* `%${name}%` % Lo utilizamos como comodin de patron de busqueda que inda que puede hacer cero o mas caracteres antes o despues del valor de busqueda
        [Op.iLike]: `%${name}%`
      },
    },
    //* incluimos los attributes de mi tabla "Activity"
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "season", "duracion"],
      through: { attributes: [] }//* no traiga datos de mi tabla intermedia
    }
  })
  //* si no pone ningun name, retornamos null para manejar el error de que no puse un nombre
  if (buscaElNombre.length === 0) {
    return null;
  }
  return buscaElNombre
}


module.exports = {
  getCountries,
  getCountrieById,
  getCountriesByName
}