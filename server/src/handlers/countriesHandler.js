const { getCountries, getCountrieById, getCountriesByName } = require("../controllers/getCountries");

const allCoontruies = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      //si nombre existe se le pide al controller que busque en db y en api
      const traerPorNombre = await getCountriesByName(name);
      if (traerPorNombre) {
        return res.json(traerPorNombre);
      } else {
        return res.send(`${name} no fue encontrado`);
      }
    } else {
      // sino dame todo
      const allPaises = await getCountries();
      return res.json(allPaises);
    }
  } catch (error) {
    //manejo si hay un error
    return res.status(400).send({ error: error.message });
  }
}

const buscarLaId = async (req, res) => {
  const { id } = req.params;
  try {
    const funcionId = await getCountrieById(id);
    return res.status(200).json(funcionId);
  } catch (error) {
    return res.status(404).json({ message: "Error trayendo el pais por ID" })
  }
}

module.exports = {
  allCoontruies,
  buscarLaId,
}