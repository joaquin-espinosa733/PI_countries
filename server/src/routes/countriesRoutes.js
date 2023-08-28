const express = require("express");
const countrieRoute = require('express').Router();
const { allCoontruies, buscarLaId, buscarNombre } = require("../handlers/countriesHandler")


countrieRoute.get("/", allCoontruies);;//GET countries...GET countries?name=""
countrieRoute.get("/:id", buscarLaId);

module.exports = countrieRoute
