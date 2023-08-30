import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { getCountries, postActivity, getActivity } from "../../redux/action"
import Validations from "./Validations"
import style from "./Form.module.css"

export default function Form() {
  const countries = useSelector((state) => state.countries);//* estado global donde contengo mis paises.
  const navigate = useNavigate();//* nos va a permitir la navegacion de rutas
  const dispatch = useDispatch();

  //* hago un dispatch mi action getActivity quien me trae la data de mis actividades creadas. y tambien getCountries que me trae todos los paises.
  useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivity())
  }, [dispatch])


  //* creamos estado local donde guardamos la info que tiene nuestro posteo
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duracion: "",
    season: "",
    countryIds: []
  });


  //* estado local que maneja los errores del form
  const [errors, setErrors] = useState({});


  //* La funcion recibe un objeto "event" que representa el evento de cambio
  //* esta funcion va a manejar eventos de cambio generados por elementos de entradas en mi caso inputs
  const changeHandler = (event) => {
    //*setForm es de mi estado local que tiene las propiedades de mi post
    setForm({
      ...form,
      //* buscamos la clave dinamica de la propiedad name y le asignamos el value que tiene nuestro event
      [event.target.name]: event.target.value,
      //* los corchetes los usamos para acceder a las propiedades de un objeto
    });
    //* aca actualizamos el estado "form" con una copia del estado actual,
    //* y luego se actualiza la propiedad correspondiente a "event.target.name"
    setErrors(
      Validations({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
    //* aca usamos la funcion validations de mi archivo validations.js que tiene las validaciones de cada input
    //* para verificar si el nuevo valor ingresado es valido. se pasa una copia del estado actual
    //* y se actualiza la propiedad correspondiente. El resultado de la validacion se almacena en el estado "errors"
  }

  //* esta funcion se llama cuando ocurre un evento de cambio(seleccion)
  const countrySelectedHandler = (event) => {
    //* se obtiene el valor seleccionado del elemento de entrada
    const selectedCountry = event.target.value;
    //* se busca el pais seleccionado en el array de paises utilizando su ID y que cumpla con la condicion especifica con el metodo find y si no lo encuentra larga undefined:
    const selectedCountrys = countries.find((country) => country.id === selectedCountry);
    //* Si se encontro un pais coincidente
    if (selectedCountrys) {
      //*si el ID del pais seleccionado ya esta en el array "countryIds" del estado "form":
      if (form.countryIds.includes(selectedCountrys.id)) {
        setForm({
          ...form,
          //* se filtra el array de IDs para quitar el ID del pais seleccionado y luego actualiza el estado "form" con el nuevo array de IDs.
          countryIds: form.countryIds.filter((id) => id !== selectedCountrys.id),
        });
      } else {
        setForm({
          ...form,
          countryIds: [...form.countryIds, selectedCountrys.id],
        });
      }
      //* se crea un nuevo array de IDs que incluye el ID del pais seleccionado y se actualiza el estado "form" con el nuevo array de IDs
    }
  };

  const handleSubmit = (event) => {
    //* event.preventDefault previene comportamientos predeterminado de un evento en un elemento HTML:
    event.preventDefault();
    //*si el input esta vacio que no submitee *//
    if (
      form.name.length === 0 ||
      form.difficulty.length === 0 ||
      form.duracion.length === 0 ||
      form.season.length === 0
    ) {
      return;
    }
    //* Validación para países seleccionados
    if (form.countryIds.length === 0) {
      alert("Selecciona al menos un país antes de enviar el formulario.");
      return;
    }
    //* si tiene errores que tampoco submitee
    if (!errors.name && !errors.difficulty && !errors.duracion && !errors.season) {
      alert(`se ha creado la nueva actividad ${form.name}`)
      //* creamos un nuevo objeto llamado newActivity y guardamos las propiedades del estado local
      const newActivity = {
        name: form.name,
        difficulty: Number(form.difficulty),
        duracion: Number(form.duracion),
        season: form.season,
        countryIds: form.countryIds,
      };
      //* hacemos un dispatch de nuestra action postActivity y le pasamos la nueva actividad creada
      dispatch(postActivity(newActivity));
      //* me traigo la lista de mis countries haciendo uso de la accion dispatch(getCountries())
      dispatch(getCountries());
      //* cuando submitee me manda al home
      const navigateToHome = navigate("/home");
      return navigateToHome;
    }
    //* previene que el formulario se envie si ciertas condiciones no se cumplen
    return false;
  };

  return (
    <div className={style.container}>
      <h1 className={style.letra}>Formulario de Actividades</h1>
      {/* //* el atributo onSubmit se utiliza en un elemento de form para especificar la funcion que se ejecutara */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name de la Activity:</label>
          <input
            type="text"
            value={form.name}
            //* cuando se escribe algo en el input osea un cambio se llama a la funcion changeHandler
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