const axios = require("axios");
const {Country,Activity} = require("../db");
const { Op } = require('sequelize');


const getCountries = async () => {
  const allCountries = await Country.findAll({
    attributes: ['id', 'name', 'flags', 'region', 'capital', 'subregion', 'area', 'population'],
    include: {
        model: Activity,
        attributes: ['name', 'difficulty', 'duracion', 'season'],
        through: {attributes: [] },//Indica que no desea incluir información de la tabla intermedia que relaciona las tablas de Países y Actividades.
    }
});
return allCountries;
// const allCountries = await axios.get("http://localhost:5000/countries");
//   const resultados = allCountries.data;
//   const traigoTodo = resultados.map((element) => ({
//       id: element.cca3,
//       name: element.name.common,
//       flags: element.flags.png,
//       region: element.region,
//       capital: Array.isArray(element.capital) ? element.capital[0] : element.capital,
//       population: element.population,
//       subregion: element.subregion,
//       area : element.area,
//   }));

//   const savedCountries = await Country.findAll({
//     attributes: ['id', 'name', 'flags', 'region', 'capital', 'subregion', 'area', 'population'],
//     include: {
//         model: Activity,
//         attributes: ['name', 'difficulty', 'duracion', 'season'],
//         through: {attributes: [] },//Indica que no desea incluir información de la tabla intermedia que relaciona las tablas de Países y Actividades.
//     }
// }); // Obtén los países guardados en la base de datos

//   // Compara los ids de los países guardados con los nuevos datos para que no haiga duplicados
//   const newCountries = traigoTodo.filter((newCountry) =>
//       !savedCountries.some((savedCountry) => savedCountry.id === newCountry.id)
//   );

//   // Inserta los nuevos países en la base de datos
//   const savedOrUpdatedCountries = await Country.bulkCreate(newCountries, {
//       updateOnDuplicate: ["name", "flags", "region", "capital", "population", "subregion", "area"]
//   });

//   return [...savedOrUpdatedCountries, ...savedCountries];// retorna los 
};



const getCountrieById = async(id)=>{
  const buscarPorId = await Country.findByPk(id, {
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'season','duracion'],
    },
  });
  return buscarPorId;
}

const getCountriesByName = async(name)=>{
  const buscaElNombre = await Country.findAll({
    where:{
      name:{
        [Op.iLike]: `%${name}%`
      },
    },
    include:{
      model: Activity,
      attributes: ["name", "difficulty", "season", "duracion"],
      through: { attributes: [] }
    }
  })
  return buscaElNombre
}


module.exports= {
  getCountries,
  getCountrieById,
  getCountriesByName
  }