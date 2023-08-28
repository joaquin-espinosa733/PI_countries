import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCountriesDetail, getActivity } from "../../redux/action";
import style from "./Detail.module.css"


export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountriesDetail(id));
    dispatch(getActivity())
  }, [dispatch, id]);

  const state = useSelector((state) => state.detail);

  const countries = state;
  const activities = countries.activities;

  return (
      <div className={style.contentContainer}>
        <div className={style.imgContainer}>
          <img src={countries.flags} alt={countries.name} className={style.img} />
        </div>
        <div className={style.parrafos}>
          <h2>CARACTERISTICAS:</h2>
          <p>diminutivo: {countries.id}</p>
          <p>nombre: {countries.name}</p>
          <p>Continente: {countries.region}</p>
          <p>Capital: {countries.capital}</p>
          <p>poblacion: {countries.population}</p>
          <p>subregion: {countries.subregion}</p>
          <p>area: {countries.area}</p>
        </div>
          <div className={style.actividades}>
            <h2>actividades:</h2>
            {activities &&
              activities.map((activity) => (
                <div key={activity.id} className={style.contenedor}>
                  <p>nombre: {activity.name}</p>
                  <p>difficulty: {activity.difficulty}</p>
                  <p>duracion: {activity.duracion}</p>
                  <p>season: {activity.season}</p>
                </div>
              ))}
          </div>
      </div>

  );
}