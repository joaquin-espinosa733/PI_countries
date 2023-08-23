import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./SearchBar.module.css"

export default function SearchBar() {

  const [countrieName, setCountrieName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const searchCountrie = async () => {
   const trimmedName = countrieName.trim();

   if(trimmedName === ""){
    setErrorMessage("ingresa un name");
    return;
   }
    try {
      const response = await axios.get(`http://localhost:3001/countries?name=${trimmedName}`);
      const countries = response.data;
      if (countries.length > 0) {
        const country = countries[0];// esto no lo entendi
        navigate(`/detail/${country.id}`);
        setCountrieName("");
      } else {
        setErrorMessage("No se encontraron países con ese nombre.");
      }
    } catch (error) {
      console.log("Error al traer el pais por name", error);
    }
  };



  const handleChange = (event) => {
    setCountrieName(event.target.value);
    setErrorMessage("");
  }

  return (
    <div className={style.bar}>
      <button
      className={style.bootonn}
      type='button' 
      onClick={searchCountrie}
      >
        search:
      </button>
      <div className={style.inputt}>
        <input
        placeholder='Buscar un país'
        type="search"
        value={countrieName}
        onChange={handleChange}
      />
      </div>
      <div style={{color: "red"}}>{errorMessage}</div>
    </div>
  )
}




