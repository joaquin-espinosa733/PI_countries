const {activitiesPost,allActivities} = require("../controllers/activitiesControllers")

const traerActivities = async(req,res)=>{
    try {
        const buscarActivities = await allActivities();
        return res.status(200).json(buscarActivities)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

const crearActividades = async(req,res)=>{
    try {
        const {id,name,difficulty,season,countryIds} = req.body;
        const  data= {id,name,difficulty,season,countryIds}
        const creacion = await activitiesPost(data);
        return res.status(200).json(creacion)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

module.exports= {
    crearActividades,
    traerActivities
};