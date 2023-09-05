const axios = require("axios");
const { Country, Activity } = require("../db");
//* importamos oP de la biblioteca de sequelize para poder hacer condiciones y comparaciones:
const { Op } = require('sequelize');

//* controller "getCountries" que busca los paises en nuestra DB:
const getCountries = async () => {
  const allCountries = await axios.get("http://localhost:5000/countries");
  const resultados = allCountries.data;
  const traigoTodo = resultados.map((element) => ({
    id: element.cca3,
    name: element.name.common,
    flags: element.flags.png,
    region: element.region,
    capital: Array.isArray(element.capital) ? element.capital[0] : element.capital,
    population: element.population,
    subregion: element.subregion,
    area: element.area,
  }));

  const savedCountries = await Country.findAll({
    attributes: ['id', 'name', 'flags', 'region', 'capital', 'subregion', 'area', 'population'],
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'duracion', 'season'],
      through: { attributes: [] },//Indica que no desea incluir información de la tabla intermedia que relaciona las tablas de Países y Actividades.
    }
  }); // Obtén los países guardados en la base de datos

  // Compara los ids de los países guardados con los nuevos datos para que no haiga duplicados
  const newCountries = traigoTodo.filter((newCountry) =>
    !savedCountries.some((savedCountry) => savedCountry.id === newCountry.id)
  );

  // Inserta los nuevos países en la base de datos
  const savedOrUpdatedCountries = await Country.bulkCreate(newCountries, {
    updateOnDuplicate: ["name", "flags", "region", "capital", "population", "subregion", "area"]
  });

  return [...savedOrUpdatedCountries, ...savedCountries];// retorna los
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