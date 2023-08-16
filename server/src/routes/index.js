const { Router } = require("express");
const countrieRoute = require("./countriesRoutes")
const activitiRouter = require("./activitysRoutes")
const router = Router();

router.use("/countries", countrieRoute);
router.use("/activities", activitiRouter)

module.exports = router;
