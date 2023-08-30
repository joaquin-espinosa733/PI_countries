const { Activity, Country } = require("../db");



const activitiesPost = async ({
    //* pasamos por params un objeto, las propiedades que queremos desestructurar y postear
    id,
    name,
    difficulty,
    season,
    duracion,
    countryIds
}) => {
    //*buscamos una instancia del modelos "Activity" con findOne en la DB de la columna "name" coinciden con el valor proporcionado en la variable "name"
    const alreadyActivities = await Activity.findOne({
        //* el where nos va a servir para filtrar una busqueda en nuestra tabla activity, en este caso queremos buscar name:
        where: {
        //*clave(se refiere al campo name de la tabla activity)-valor(el que pasamos por parametros)
            name: name,
        },
    });
    //* si no existe, hacemos el create a la tabla de "Activity"
    if (!alreadyActivities) {
        const activity = await Activity.create({ id, name, difficulty, duracion, season })
        //* asociamos paises a la actividad haciendo la relacion entre "activity" y "country"
        await activity.addCountry(countryIds)
        //*despues de crear la actividad y asociar los paises, hacemos una busqueda para obtener la actividad recien creada con la info de los paises asociados.
        let activitySearch = await Activity.findOne({
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
                //* through se utiliza cuando se configura una asociacion de muchos a muchos:
                through: {
                    attributes: []//* no trae nada de la tabla intermedia:
                }
            }
        })
        //* retorna la actividad recien creada junto con la info de los paises
        return activitySearch
    }
    //* asociamos la actividad existente al pais que corresponda y creamos una entrada a la tabla intermedia
    const activityWithCountry = await alreadyActivities.addCountry(countryIds);

    return activityWithCountry
}



const allActivities = async () => {
    //* hacemos una busqueda general de nuestra tabla "Activity" y incluimos tambien nuestra tabla " Country"
    const bringActivities = await Activity.findAll({ include: Country });
    return bringActivities;
}

module.exports = {
    activitiesPost,
    allActivities
}