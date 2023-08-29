const express = require("express");
const { createActivity,bringActivities } = require("../handlers/activitiesHandler");
const activitiRouter = require('express').Router();
//*Creamos nuestra ruta .post y le pasamos el handelr "createActivity" quien va ser el create de actividades:
activitiRouter.post("/", createActivity)
//* creamos nuestra ruta .get y le pasamos el handler "bringActivities" quien trae todas las actividades:
activitiRouter.get("/", bringActivities);

module.exports = activitiRouter;