import Card from '../Card/Card'
import { useDispatch, useSelector } from "react-redux";
import style from "../Cards/Cards.module.css"
import { useEffect, useState } from 'react';
import { setPage, getActivity, filterActivities, filterContinents, getCountries } from '../../../redux/action';

export default function Cards() {

    const dispatch = useDispatch();
    const countriesSorted = useSelector((state) => state.countriesSorted)
    const activity = useSelector((state) => state.activity);
    const countries = useSelector(state => state.countries);
    const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
    const totalPages = useSelector((state) => state.pagination.totalPages);
    const currentPage = useSelector((state) => state.pagination.thisPage);


    // const [selectedContinent, setSelectedContinent] = useState('ALL');//! estado local del filtrado de los contienentes.
    const [selectedSorting, setSelectedSorting] = useState("");//! estado local del filtrado por "A"-"Z", "Z"-"A"
    const [selectedActivity, setSelectedActivity] = useState('default');

    useEffect(() => {
        dispatch(setPage(1));
        if (selectedActivity === 'default') {
            dispatch(getCountries()); // Mostrar todos los países al principio
        } else {
            dispatch(filterActivities(selectedActivity, countries));
        }
    }, [selectedActivity, dispatch])

    useEffect(() => {
        dispatch(getActivity()); // Obtener actividades
    }, [dispatch]);


    const filterByActivity = e => {
        const activity = e.target.value;
        setSelectedActivity(activity);
        dispatch(setPage(1)); // Reiniciar la página
        if (activity === "default") {
            dispatch(filterActivities('', countries)); // Mostrar todos los países al seleccionar "default"
        } else {
            dispatch(filterActivities(activity, countriesSorted)); // Aplicar filtro de actividad
        }
    };

    const filterByContinent = e => {
        dispatch(filterContinents(e.target.value, countries));
        dispatch(setPage(1));
    };

    const totalFilteredItems = countries.length;  //* sacamos cuantos paises vienen del filter(250 paises).
    const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);  //* vamos a utilizar Math.ceil para devolver el entero mayor o igual entre la divicion de totalFilteredItems y itemsPerPage del estado global
    const totalUsedPages = totalPages;//* si selectedContinent es "ALL" utiliza totalPages del estado global que trae todos los paises y si es totalFilteredPages utiliza el estado local.

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalFilteredItems);


    //! esta funcion va hacer el filtrado de ordenamiento de "A" a la "Z", De la "Z" a la "A", y de max y min poblacion del pais
    const sortCountries = (countries, sortOrder) => {
        return countries.slice().sort((a, b) => {
            switch (sortOrder) {
                case "A":
                    return a.name.localeCompare(b.name);
                case "Z":
                    return b.name.localeCompare(a.name);
                case "MAX":
                    return b.population - a.population;
                case "MIN":
                    return a.population - b.population;
                default:
                    return 0;
            }
        });
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalUsedPages) {
            dispatch(setPage(newPage));
        }
    }

    return (
        <div className={style.cardsContainer}>
            <div className={style.filtrados}>
                {/*onChange es un evento en js y se ejecuta una funcion que especificas, en este caso, pasamos una call back y que cuando se ejecute "handleFilterChange" valla a la propiedad e.target.value y realize el filtro del continente que le pido. */}
                <select className={style.filters} onChange={filterByContinent}>
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
            </div>
            <div className={style.cardsContainer}>
                {
                    sortCountries(countriesSorted, selectedSorting)
                        .slice(startIndex, endIndex)
                        .map((coun) => <Card
                            key={coun.id}
                            id={coun.id}
                            name={coun.name}
                            flags={coun.flags}
                            region={coun.region}
                            capital={coun.capital}
                            population={coun.population}
                            subregion={coun.subregion}
                            area={coun.area}
                            actividad={coun.activity}
                        />)
                }
            </div>
            <div className={style.paginationContainer}>
                <div>
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