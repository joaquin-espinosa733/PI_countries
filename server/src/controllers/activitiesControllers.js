const { Activity, Country } = require("../db");



const activitiesPost = async ({
    id,
    name,
    difficulty,
    season,
    duracion,
    countryIds
}) => {
    const alreadyActivities = await Activity.findOne({
        where: {
            name: name,
        },
    });

    if (!alreadyActivities) {
        const activity = await Activity.create({ id, name, difficulty, duracion, season })
        await activity.addCountry(countryIds)

        let activityWithCountry = await Activity.findOne({
            where: {
                name: name
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt'],
            },
            include: {
                model: Country,
                through: {
                    attributes: []
                }
            }
        })
        return activityWithCountry
    }
    const activityWithCountry = await nuevaActividad.addCountries(countryIds);

    return activityWithCountry
}



const allActivities = async () => {
    const buscarActividades = await Activity.findAll({ include: Country });
    return buscarActividades;
}

module.exports = {
    activitiesPost,
    allActivities
}