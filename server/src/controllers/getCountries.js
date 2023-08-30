const { Country, Activity } = require("../db");
//* importamos oP de la biblioteca de sequelize para poder hacer condiciones y comparaciones:
const { Op } = require('sequelize');

//* controller "getCountries" que busca los paises en nuestra DB:
const getCountries = async () => {
  //* creamos una varibale allCountries y guardamos y buscamos en la tabla country de mi base de datos con findAll que podemos leer la tabla completa y los attributes requeridos:
  const allCountries = await Country.findAll({
    attributes: ['id', 'name', 'flags', 'region', 'capital', 'subregion', 'area', 'population'],
    //* y que tambien incluya los attributes de mi tabla de activity:
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'duracion', 'season'],
      through: { attributes: [] },//* el atributo through + attributes y le asignamos un array vacio Indica que no desea incluir información de la tabla intermedia que relaciona las tablas de Países y Actividades.
    }
  });
  return allCountries;
};



const getCountrieById = async (id) => {
  //* hacemos una busqueda con findByPk para buscar la primary key en este caso la ID
  const searchForId = await Country.findByPk(id, {
    //* incluimos los attributes de mi tabla "Activity"
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'season', 'duracion'],
    },
  });
  return searchForId;
}

const getCountriesByName = async (name) => {
  //* buscamos por name en nuestra DB
  const searchByName = await Country.findAll({
    where: {
      name: {
        //* [Op.iLike]: busqueda de cadena insensible a mayusculas y minusculas(case-insentive) en la DB
        //* `%${name}%` % Lo utilizamos como comodin de patron de busqueda que puede ser cero o mas caracteres antes o despues del valor de busqueda
        [Op.iLike]: name
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
  if (searchByName.length === 0) {
    return null;
  }
  return searchByName
}


module.exports = {
  getCountries,
  getCountrieById,
  getCountriesByName
}