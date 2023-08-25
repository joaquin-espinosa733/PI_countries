import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import{getCountries, postActivity, getActivity} from "../../redux/action"
import Validations from "./Validations"
import style from "./Form.module.css"

export default function Form() {
  const countries = useSelector((state)=> state.countries);
  const navigate = useNavigate();
  const dispatch = useDispatch();

     useEffect(()=>{
     dispatch(getActivity())
   },[dispatch])

  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duracion: "",
    season:"",
    countryIds:[]
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (event)=> {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      Validations({
        ...form,
        [event.target.name] : event.target.value,
    })
  );
}


const countrySelectedHandler = (event) => {
  const selectedCountry = event.target.value;
  const selectedCountrys = countries.find((country) => country.id === selectedCountry);

  if (selectedCountrys) {
    if (form.countryIds.includes(selectedCountrys.id)) { 
      setForm({
        ...form,
        countryIds: form.countryIds.filter((id) => id !== selectedCountrys.id),
      });
    } else {
      setForm({
        ...form,
        countryIds: [...form.countryIds, selectedCountrys.id], 
      });
    }
  }
};





const handleSubmit = (event)=> {
  event.preventDefault();
  const newActivity = {
    name: form.name,
    difficulty: Number(form.difficulty),
    duracion: Number(form.duracion),
    season: form.season,
    countryIds: form.countryIds,
  };
  dispatch(postActivity(newActivity));
  dispatch(getCountries());
  navigate("/home");
}


  return (
    <div className={style.container}>
    <h1 className={style.letra}>Formulario de Actividades</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name de la actividad:</label>
          <input 
          type="text"
          value={form.name}
          onChange={changeHandler}
          name='name'
          />
        </div>
        {errors.name && <p className={style.errors}>{errors.name}</p>}
    <div>
         <label>difficulty de la actividad:</label>
         <select name="difficulty" value={form.difficulty} onChange={changeHandler} >
          <option value="defaul">asignar dificultad de la actividad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
         </select>
    </div>
    {errors.difficulty && <p className={style.errors}>{errors.difficulty}</p>}
    <div>
      <label>season del country:</label>
      <select name="season" value={form.season} onChange={changeHandler} >
        <option value="default">selecciona una season valida</option>
        <option value="Otoño">Otoño</option>
        <option value="Verano">Verano</option>
        <option value="Invierno">Invierno</option>
        <option value="Primavera">Primavera</option>
      </select>
    </div>
    {errors.season && <p className={style.errors}>{errors.season}</p>}
    <div>
      <label>duracion de la actividad:</label>
      <input 
      type="text"
      value={form.duracion}
      name='duracion'
      onChange={changeHandler}
       />
    </div>
    {errors.duracion && <p className={style.errors}>{errors.duracion}</p>}
    <div className={style.countryList}>
    {countries.map((country) => (
    <label key={country.id} className={style.countryLabel}>
    <input
      type="checkbox"
      value={country.id}
      checked={form.countryIds.includes(country.id)}
      onChange={countrySelectedHandler}
    />
    {country.name}
    </label>
      ))}
    </div>

    <button className={style.button}type='submit'>SUBMIT</button>
    </form>
  </div>
  )
}
