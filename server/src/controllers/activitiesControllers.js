const axios = require("axios");
const {Activity,Country} = require("../db");



const activitiesPost = async ({
    id,
    name,
    difficulty,
    season,
    countryIds
}) => {
    const nuevaActividad = await Activity.create({
        id: id,
        name: name,
        difficulty: difficulty,
        season: season
    });

    if (countryIds && countryIds.length > 0) {
        const countries = await Country.findAll({
            where: { id: countryIds },
        });

        await nuevaActividad.setCountries(countries); // Usamos setCountries en lugar de addCountries
    }

    // Ahora buscamos la actividad recién creada con la relación a países
    const actividadConPaises = await Activity.findByPk(nuevaActividad.id, {
        include: Country, // Incluimos la relación con países
    });

    return actividadConPaises;
}



const allActivities = async()=>{
    const buscarActividades= await Activity.findAll();
    return buscarActividades;
}

module.exports = {
    activitiesPost, 
    allActivities
}