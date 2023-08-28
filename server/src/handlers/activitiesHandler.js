const { activitiesPost, allActivities } = require("../controllers/activitiesControllers")


const traerActivities = async (req, res) => {
    try {
        const buscarActivities = await allActivities();
        return res.status(200).json(buscarActivities)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}
const crearActividades = async (req, res) => {
    const { id, name, difficulty, season, duracion, countryIds } = req.body;
    try {
        const data = { id, name, difficulty, season, duracion, countryIds }
        const creacion = await activitiesPost(data);
        return res.status(200).json(creacion)
    } catch (error) {
        return res.status(404).json({ error: "Se repite la actividad" })
    }
}

module.exports = {
    crearActividades,
    traerActivities
};