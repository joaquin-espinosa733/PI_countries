const { getCountries, getCountrieById, getCountriesByName } = require("../controllers/getCountries");

const allCoontruies = async (req, res) => {
  //* desestructuramos NAME que vamos a pasar por query:
  const { name } = req.query;
  try {
    if (name) {
      //* si nombre existe se le pide al controller que busque en db
      const bringByName = await getCountriesByName(name);
      if (bringByName) {
        return res.status(200).json(bringByName);
      } else if(bringByName === null){
        return res.status(404).send(`${name} no fue encontrado`);
      }
    } else {
      //* sino dame todo
      const allPaises = await getCountries();
      return res.status(200).json(allPaises);
    }
  } catch (error) {
    //* manejo si hay un error
    return res.status(400).send({ error: error.message });
  }
}
//* handler encargado de manejar los errores del controller que busca por ID y de pasarle por params la ID:
const seachTheId = async (req, res) => {
  //* Desestructuramos el id que nos llega por params
  const { id } = req.params;
  try {
    //* guardamos en una variabe el controller getCountrieById:
    const funcionId = await getCountrieById(id);
    //* manejamos la respuesta correcta con un status 200 y devuelve un .json con la info que guardamos en la variable funcionId:
    return res.status(200).json(funcionId);
  } catch (error) {
    //* si el ID es incorrecto entra al catch y manejamos la respues erronea con un status 404 y que devuelva un .json con el mensaje de error
    return res.status(404).json({ message: "Error trayendo el pais por ID" })
  }
}

module.exports = {
  allCoontruies,
  seachTheId,
}