const { Activity, Country } = require("../db");



const activitiesPost = async ({
    //* pasamos por params, las propiedades que queremos postear
    id,
    name,
    difficulty,
    season,
    duracion,
    countryIds
}) => {
    //*buscamos una instancia del modelos "Activity" con findOne en la DB de la columna "name" coinciden con el valor proporcionado en la variable "name"
    const alreadyActivities = await Activity.findOne({
        where: {
            name: name,
        },
    });
    //* si no existe, hacemos el create a la tabla de "Activity"
    if (!alreadyActivities) {
        const activity = await Activity.create({ id, name, difficulty, duracion, season })
        //* asociamos paises a la actividad haciendo la relacion entre "activity" y "country"
        await activity.addCountry(countryIds)

        let activityWithCountry = await Activity.findOne({
            where: {
                name: name
            },
            //* excluimos estas propiedades a la hora de traernos la info
            attributes: {
                exclude: ['updatedAt', 'createdAt'],
            },
            //* incluimos nuestro modelo "Country"
            include: {
                model: Country,
                through: {
                    attributes: []
                }
            }
        })
        return activityWithCountry
    }
    //* asocioamos la actividad existente al pais que corresponda
    const activityWithCountry = await alreadyActivities.addCountry(countryIds);

    return activityWithCountry
}



const allActivities = async () => {
    //* hacemos una busqueda general de nuestra tabla "Activity" y incluimos tambien nuestra tabla " Country"
    const buscarActividades = await Activity.findAll({ include: Country });
    return buscarActividades;
}

module.exports = {
    activitiesPost,
    allActivities
}