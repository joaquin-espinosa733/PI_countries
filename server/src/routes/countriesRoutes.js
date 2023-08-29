const express = require("express");
const countrieRoute = require('express').Router();
const { allCoontruies, seachTheId} = require("../handlers/countriesHandler")

//* creamos nuestra .get/ quien le pasamos nuestro handler allCountries que se encarga de buscar por name y si no trae todos los paises:
countrieRoute.get("/", allCoontruies);;//GET countries...GET countries?name=""
//* creamos nuestra ruta .get/ quien le pasamos nuestro hanlder "seachTheId" que se encarga de la busqueda de countries por ID: 
countrieRoute.get("/:id", seachTheId);

module.exports = countrieRoute
