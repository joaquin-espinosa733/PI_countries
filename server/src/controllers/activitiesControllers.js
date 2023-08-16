const axios = require("axios");
const {Activity,Country} = require("../db");
const{getCountrieById} = require("./getCountries")


const activitiesPost = async({
    id,
    name,
    difficulty,
    season,
    countryIds
}) => {
    const crearActividad = await Activity.create({
        id: id,
        name: name,
        difficulty: difficulty,
        season: season
    });

    // Agregar los países relacionados
    if (countryIds && countryIds.length > 0) {
        const countries = await Promise.all(countryIds.map(countryId => getCountrieById(countryId)));
        await crearActividad.addCountry(countries);
    }

    return crearActividad;
}


const allActivities = async()=>{
    const buscarActividades= await Activity.findAll();
    return buscarActividades;
}

module.exports = {
    activitiesPost, 
    allActivities
}