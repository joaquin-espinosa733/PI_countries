//*importamos "Router" del modulo de express:
const { Router } = require("express");
const countrieRoute = require("./countriesRoutes")
const activitiRouter = require("./activitysRoutes")
//* creamos una varible para guardar la instancia de Router():
const router = Router();

router.use("/countries", countrieRoute);//*utilizamos "countrieRouter" cuando se acceda a tutas que comiencen con "/countries"
router.use("/activities", activitiRouter)//*utilizamos "activitiRouter" cuando se acceda a rutas que comiencen con "/activities"

module.exports = router;
