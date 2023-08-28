import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./SearchBar.module.css"

export default function SearchBar() {

  const [countrieName, setCountrieName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();//* nos va a permitir la navegacion de rutas

  const searchCountrie = async () => {
    //* eliminamos por si hay espacios en blanco o tabulaciones en el string
    const trimmedName = countrieName.trim();
    //* si no ingresa nada arroja un error
    if (trimmedName === "") {
      return setErrorMessage("ingresa un name");
    }
    try {
      //* hacemos la peticion .get a nuestra url que busca por name
      const response = await axios.get(`http://localhost:3001/countries?name=${trimmedName}`);
      //* guardamos la data en una variable.
      const countries = response.data;
      //* verificamos si encontro paises segun la longitud del array.
      if (countries.length > 0) {
        //* si hay paises en la respuesta, en esta variable tomamos el primer pais de la lista y lo almacenamos
        const country = countries[0];
        //* cuando busquemos el pais que queremo que nos mande a su detail.
        navigate(`/detail/${country.id}`);
        //* limpiamos el input para que quede vacio.
        setCountrieName("");
      } else {
        setErrorMessage("No se encontraron países con ese nombre.");
      }
      //* manejamos el error del back-end en el front-end
    } catch (error) {
      if(error.response){
        //* si el status es 404, mandamos un error al estado local "setErrorMessage".
        if(error.response.status === 404){
          setErrorMessage("No se encontraron países con ese nombre.")
        }
      }
    }
  };



  const handleChange = (event) => {
    setCountrieName(event.target.value);//* obtenemos el valor actual del elemento "setCountrieName".
    setErrorMessage("");//* si no tiene errores, un string vacio.
  }

  return (
    <div className={style.bar}>
      <button
        className={style.bootonn}//* le agreamos los styles al button
        type='button'
        onClick={searchCountrie}//* colocamos el atributo onClick que ejecuta una funcion cuando se le hace click al button en este caso searchCountrie.
      >
        search:
      </button>
      <div className={style.inputt}>
        <input
          placeholder='Buscar un país...'
          type="search"
          value={countrieName}//* el valor del campo de entrada se establece en el estado "countrieName".
          onChange={handleChange}//* le pasamos la funcion handleChange 
        />
      </div>
      <div style={{ color: "red" }}>{errorMessage}</div>
    </div>
  )
}




