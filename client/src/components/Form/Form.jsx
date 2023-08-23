import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import{getCountries, postActivity, getActivity} from "../../redux/action"

export default function Form() {
  const types = useSelector((state)=> state.activity);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    diffilculty:"",
    duracion:"",
    season:"",
    countries:[]
  });

  const [errors, setErrors] = useState({});

  return (
    <div>
      <form>
    <h1>Formulario de Actividades</h1>

    <h2>Name de la actividad</h2>

    <h2>difficulty de la actividad</h2>

    <h2>season del country</h2>

    <h2>duracion de la actividad</h2>

    <label htmlFor="">
    <input id="indoor" type="radio" name="indoor-outdoor" value="indoor" checked=""/>
    </label>

    <button type='submit'>SUBMIT</button>
    </form>
  </div>
  )
}
