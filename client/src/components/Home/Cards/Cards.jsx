import Card from '../Card/Card'
import { useDispatch, useSelector } from "react-redux";
import style from "../Cards/Cards.module.css"
import { useEffect, useState } from 'react';
import { setPage, getActivity, filterActivities, filterContinents, getCountries } from '../../../redux/action';

//!Componente funcional que va a renderizar todos los paises y ademas los filtrados y paginado
export default function Cards() {
    //* el useDispatch lo vamos a utilizar para modificar el estado de redux, para enviar una accion al store.
    const dispatch = useDispatch();
    //* useSelector vamos a seleccionar porciones especificas del estado global y llevarlo a un componente funcional de react en este  caso Cards
    const countries = useSelector(state => state.countries);
    const activity = useSelector((state) => state.activity);
    const countriesSorted = useSelector((state) => state.countriesSorted)
    const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
    const currentPage = useSelector((state) => state.pagination.thisPage);

    //* utilizamos use useState para añadir estados local a mi componente.
    const [selectedSorting, setSelectedSorting] = useState("");//! estado local del filtrado por "A"-"Z", "Z"-"A".
    const [selectedActivity, setSelectedActivity] = useState("");//! estado local para el filtrado de las actividades de los countries.
    const [selectedContinent, setSelectedContinent] = useState("ALL");//! estado local para el manejo del select de continent
    //*useEffect lo vamos autilizar para manejar el ciclo de vida del componente perimitiendo realizar efectos secundarios, EJ= manipulacion del DOM.
    useEffect(() => {
        dispatch(setPage(1));
        if (selectedActivity === "" || selectedActivity === "default") {
            //* Mostrar todos los países al principios si el value es default o string vacio.
            dispatch(getCountries()); 
        } else {
            dispatch(filterActivities(selectedActivity));
        }
        //*debe ejecutarse siempre que cualquiera de las siguientes dependencias cambien:
    }, [selectedActivity, dispatch])

    useEffect(() => {
    //* Obtener las actividades creadas
        dispatch(getActivity()); 
    }, [dispatch]);

    const filterByActivity = e => {
        //* accedemos al evento con target.value, target en quien tiene info del evento y value donde se contiene el valor ingresado
        const activity = e.target.value;
        //* vamos a actualizar el estado pasandole nuestro value
        setSelectedActivity(activity);
        //* Reiniciar la página a la primer pagina
        dispatch(setPage(1)); 
        if (activity === "default") {
            dispatch(filterActivities("", countries)); //* Mostrar todos los países al seleccionar "default"
        } else {
            dispatch(filterActivities(activity, countriesSorted)); //* Aplicar filtro de actividad
        }
    };

    const filterByContinent = e => {
        const continent = e.target.value;
        setSelectedContinent(continent)
        dispatch(filterContinents(continent, countries));
        dispatch(setPage(1));
    };

    const totalFilteredItems = countriesSorted.length;  //* sacamos cuantos paises vienen del filter(250 paises).
    const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);  //* vamos a utilizar Math.ceil para devolver el entero mayor o igual entre la divicion de totalFilteredItems y itemsPerPage del estado global
    const totalUsedPages = Math.max(totalFilteredPages, 1); //* Asegura que totalUsedPages no sea menor que 1


    const startIndex = (currentPage - 1) * itemsPerPage;//* se calcula para determinar el indice en el que comienza la lista de paises de la pagina actual
    //* Math.min()toma dos argumentos y devulve el valor mas pequeño
    const endIndex = Math.min(startIndex + itemsPerPage, totalFilteredItems);//* se calcula para determinar el indice en el que termina la lista de paises que se mostrara en la pagina actual


    //! esta funcion va hacer el filtrado de ordenamiento de "A" a la "Z", De la "Z" a la "A", y de max y min poblacion del pais
    const sortCountries = (countries, sortOrder) => {
        //* slice nos da una copia del array de paises y despues hacemos el sort para ordenar como queramos esa copia del array:
        return countries.slice().sort((a, b) => {
            switch (sortOrder) {
                case "A":
                    return a.name.localeCompare(b.name);
                case "Z":
                    return b.name.localeCompare(a.name);
                case "MAX":
                    return b.population - a.population;//* obtendremos un orden descendentes con mayor poblacion primero(aca da numero negativo)
                case "MIN":
                    return a.population - b.population;//* obtendremos un orden ascendente con la menos poblacion primero(aca numero positivo)
                default:
                    return 0;
            }
        });
    }

    const handlePageChange = (newPage) => {
        //* Math.max para asegurar que la pagina no sea menor a 1 y Math.min para asegurarse de que la pagina no sea mayor que totalUsedPages(numero total de paginas disponibles)
        const updatedPage = Math.max(Math.min(newPage, totalUsedPages), 1);
        dispatch(setPage(updatedPage));
    }

    const resetFilters = () => {
        setSelectedSorting("");//* restablecer ordenamiento
        setSelectedActivity("");//* restablecer actividad
        setSelectedContinent("ALL");//* resetear el value del select de continent a "ALL"
        dispatch(filterContinents("ALL")); //* pasamos ALL por parametros para resetear el estado global
        dispatch(setPage(1));//* reiniciar la pagina
    }

    return (
        <div className={style.cardsContainer}>
            <div className={style.filtrados}>
                {/* //*onChange es un evento en js y se ejecuta una funcion que especificas, en este caso,pasamos "filterBycontinent" valla a la propiedad e.target.value y realize el filtro del continente que le pido. */}
                <select className={style.filters} onChange={filterByContinent} value={selectedContinent}>
                    <option value="ALL" onClick={filterByContinent}>ALL</option>
                    <option value="Asia" onClick={filterByContinent}>ASIA</option>
                    <option value="Americas" onClick={filterByContinent}>AMERICAS</option>
                    <option value="Africa" onClick={filterByContinent}>AFRICA</option>
                    <option value="Antarctic" onClick={filterByContinent}>ANTARCTIC</option>
                    <option value="Europe" onClick={filterByContinent}>EUROPE</option>
                    <option value="Oceania" onClick={filterByContinent}>OCEANIA</option>
                </select>

                <select onChange={filterByActivity} value={selectedActivity} className={style.filters}>
                    <option value="default">Select an activity</option>
                    {/* //* el .map nos va a permitir iterar el array y generar elementos <option></option> dentro del elemento <select></select> en base a lo que me trae el array */}
                    {Array.isArray(activity) && activity.map((act) => (
                        <option key={act.id} value={act.name}>{act.name}</option>
                    ))}
                </select>

                <select className={style.filter} value={selectedSorting} onChange={(e) => setSelectedSorting(e.target.value)}>
                    <option value="default">default</option>
                    <option value="A">A-Z</option>
                    <option value="Z">Z-A</option>
                </select>

                <select className={style.filter} value={selectedSorting} onChange={(e) => setSelectedSorting(e.target.value)}>
                    <option value="">default</option>
                    <option value="MAX">max population</option>
                    <option value="MIN">min population</option>
                </select>

                <div>
                    <button className={style.buttonReset} onClick={resetFilters}>Reset filters</button>
                </div>
            </div>
            <div className={style.cardsContainer}>
                {
                    sortCountries(countriesSorted, selectedSorting)//* se llama a la funcion sortCountries, con el array de paises filtrados y el estado local de ordenamiento.
                        .slice(startIndex, endIndex)//*despues de ordenar los paises, se utiliza slice para obtener un array que son los elementos que deben mostrarse en la pagina actual de principio asta el final
                        //* y para terminar un map al array de paises ordenados
                        .map((coun) => 
                            <Card
                                key={coun.id}
                                id={coun.id}
                                name={coun.name}
                                flags={coun.flags}
                                region={coun.region}
                                capital={coun.capital}
                                population={coun.population}
                                subregion={coun.subregion}
                                area={coun.area}
                            />)
                }
            </div>

            <div className={style.paginationContainer}>
                <div className={style.pagination}>
                    <button className={style.button} onClick={() => handlePageChange(currentPage - 1)}> Previous </button>
                    <p>
                        Page {currentPage} of {totalFilteredPages}
                    </p>
                    <button className={style.button} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
}