const axios = require("axios");
const {Country,Activity} = require("../db");
const { Op } = require('sequelize');


const getCountries = async()=>{
    // await Country.destroy({ where: {} });// con esta linea, cuando haga una nueva peticion a la api, se va a resetear los datos que estan dentro de la base de datos(esto es de prueba)
    const allCountries = await axios.get("http://localhost:5000/countries");
    const resultados = allCountries.data; // Me traigo toda la data con los paises
    const traigoTodo = resultados.map( element=>({//mapeo la data que me trae todos los paises y sacar la info que necesito
        id : element.cca3,
        name: element.name.common,
        flags: element.flags.png,
        region: element.region,
        capital: Array.isArray(element.capital) ? element.capital[0] : element.capital,
        population: element.population
    }))
    let guardarEnDb = await Country.bulkCreate(traigoTodo);//guardo en mi base de datos todos los paises
    return [...guardarEnDb] //retorno y me traigo a todos los paises que tengo en mi base de datos
}


const getCountrieById = async(id)=>{
  const buscarPorId = await Country.findByPk(id, {
    include: {
      model: Activity,
      attributes: ['id', 'name', 'difficulty', 'season'],
      through: { attributes: [] }, // Evita traer las columnas de la tabla intermedia
    },
  });
  return buscarPorId;
}

const getCountriesByName = async(name)=>{
  const buscaElNombre = await Country.findAll({
    where:{
      name:{
        [Op.iLike]: `%${name}%`
      }
    }
  })
  return buscaElNombre
}


module.exports= {
  getCountries,
  getCountrieById,
  getCountriesByName
  }