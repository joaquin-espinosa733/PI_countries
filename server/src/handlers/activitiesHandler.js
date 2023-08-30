const { activitiesPost, allActivities } = require("../controllers/activitiesControllers")

//* hanlder que maneja las respuestas del controller que trae todas las actividades
const bringActivities = async (req, res) => {
    try {
        //* constante que nos guardamos nuestro controller que nos trae todas nuestras actividades creadas:
        const searchActivity = await allActivities();
        //* si trae todo las actividades creadas, hacemos una respuesta status 200 y que devuelva un .json con todas las actividades:
        return res.status(200).json(searchActivity)
    } catch (error) {
        //* ante cualquier error entra al catch y tira una respuesta con status 404 y devuelve un .json con el mensaje del error:
        return res.status(404).json({ error: error.message })
    }
}

//* handler para manejar las respues del post de las actividades
const createActivity = async (req, res) => {
    //* nos traemos las propiedades para hacer el post por body:
    const { id, name, difficulty, season, duracion, countryIds } = req.body;
    try {
        //* guardamos en una variable DATA todas las propiedades necesarias para el post:
        const data = { id, name, difficulty, season, duracion, countryIds }
        //*creamos una variable y guardamos nuestro controller que realiza el CREATE de actividades y le pasamos el objeto de la variable data:
        const created = await activitiesPost(data);
        //* si se crea con exito la manejo con una respuesta status 200 y que devuelva un .json con la actividad creada
        return res.status(200).json(created)
    } catch (error) {
        //* si se repite la actividad entra al catch y manejamos el error con una respuesta status 404 y devuelve un .json con el error:
        return res.status(404).json({ error: "Se repite la actividad" })
    }
}

module.exports = {
    createActivity,
    bringActivities
};