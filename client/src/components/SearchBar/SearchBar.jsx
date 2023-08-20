import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [countrieName, setCountrieName] = useState("");
  const navigate = useNavigate(); 

  const searchCountrie = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/countries?name=${countrieName}`);
      const countries = response.data;
      if (countries.length > 0) {
        const country = countries[0]; 
        navigate(`/detail/${country.id}`);
      } else {
        console.log("No se encontraron países con ese nombre.");
      }
    } catch (error) {
      console.log("Error al traer el pais por name", error);
    }
  };

  const handleChange = (event) => {
    setCountrieName(event.target.value);
  }

  return (
    <div>
      <button type='button' onClick={searchCountrie}>Buscar por nombre:</button>
      <input
        placeholder='Buscar un país'
        type="search"
        value={countrieName}
        onChange={handleChange}
      />
    </div>
  )
}




