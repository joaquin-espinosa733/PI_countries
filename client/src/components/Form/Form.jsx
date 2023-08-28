import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { getCountries, postActivity, getActivity } from "../../redux/action"
import Validations from "./Validations"
import style from "./Form.module.css"

export default function Form() {
  const countries = useSelector((state) => state.countries);//estado global donde contengo mis paises.
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {//me tragio mi action getActivity quien me trae la data de mis actividades creadas. y tambien getCountries que me trae todos los paises.
    dispatch(getCountries())
    dispatch(getActivity())
  }, [dispatch])

  const [form, setForm] = useState({//creamos estado local donde guardamos la info que tiene nuestro posteo
    name: "",
    difficulty: "",
    duracion: "",
    season: "",
    countryIds: []
  });

  const [errors, setErrors] = useState({});// estado local que maneja los errores del form

  const changeHandler = (event) => {// que me lo explique
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      Validations({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  }


  const countrySelectedHandler = (event) => {//* funcion para la seleccion de paises
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


  const handleSubmit = (event) => {
    event.preventDefault();
    if (/*si el input esta vacio que no submitee */
      form.name.length === 0 ||
      form.difficulty.length === 0 ||
      form.duracion.length === 0 ||
      form.season.length === 0
    ) {
      return;
    }
    if (form.countryIds.length === 0) { //* Validación para países seleccionados
      alert("Selecciona al menos un país antes de enviar el formulario.");//! si no se selecciona alguno, larga una alert de que se tiene que seleccionar almenos un pais
      return;
    }

    if (!errors.name && !errors.difficulty && !errors.duracion && !errors.season) { //* si tiene errores que tampoco submitee
      alert(`se ha creado la nueva actividad ${form.name}`)//* alert cuando se cree la actividad correctamente
      const newActivity = {
        name: form.name,
        difficulty: Number(form.difficulty),
        duracion: Number(form.duracion),
        season: form.season,
        countryIds: form.countryIds,
      };
      dispatch(postActivity(newActivity));//* hacemos un dispatch de nuestra action postActivity y le pasame la nueva actividad creada
      dispatch(getCountries());//* me traigo a mis countries
      const navigateToHome = navigate("/home", { replace: true });//* cuando submitee me manda al home
      return navigateToHome;
    }
    return false;
  };

  return (
    <div className={style.container}>
      <h1 className={style.letra}>Formulario de Actividades</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name de la Activity:</label>
          <input
            type="text"
            value={form.name}
            onChange={changeHandler}
            name='name'
            className={style.inputs}
          />
        </div>
        {errors.name && <p className={style.errors}>{errors.name}</p>}
        <div>
          <label>difficulty de la activity:</label>
          <select className={style.inputs} name="difficulty" value={form.difficulty} onChange={changeHandler} >
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
          <select className={style.inputs} name="season" value={form.season} onChange={changeHandler} >
            <option value="default">selecciona una season valida</option>
            <option value="Otoño">Otoño</option>
            <option value="Verano">Verano</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </div>
        {errors.season && <p className={style.errors}>{errors.season}</p>}
        <div>
          <label>duration de la activity:</label>
          <input
            type="text"
            value={form.duracion}
            name='duracion'
            onChange={changeHandler}
            className={style.inputs}
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
        <button className={style.button} type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}
