const express = require("express");
const { crearActividades, traerActivities } = require("../handlers/activitiesHandler");
const activitiRouter = require('express').Router();

activitiRouter.post("/", crearActividades)
activitiRouter.get("/", traerActivities);

module.exports = activitiRouter;