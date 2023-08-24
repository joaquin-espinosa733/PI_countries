import Card from '../Card/Card'
import { useDispatch, useSelector } from "react-redux";
import style from "../Cards/Cards.module.css"
import { useEffect, useState } from 'react';
import { setPage } from '../../../redux/action';

export default function Cards() {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const itemsPerPage = useSelector((state)=> state.pagination.itemsPerPage);
    const totalPages = useSelector((state)=> state.pagination.totalPages);
    const currentPage = useSelector((state)=> state.pagination.thisPage);


    const [selectedContinent, setSelectedContinent] = useState('ALL');//! estado local del filtrado de los contienentes.
    const [selectedSorting, setSelectedSorting] = useState("default");// !estado local del filtrado por "A"-"Z", "Z"-"A"

    const filteredCountries = selectedContinent === "ALL"
        ? countries
        : countries.filter(coun=> coun.region === selectedContinent);

    const totalFilteredItems = filteredCountries.length;  //* sacamos cuantos paises vienen del filter(250 paises).
    const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);  //* vamos a utilizar Math.ceil para devolver el entero mayor o igual entre la divicion de totalFilteredItems y itemsPerPage del estado global
    const totalUsedPages = selectedContinent === 'ALL' ? totalPages : totalFilteredPages;  //* si selectedContinent es "ALL" utiliza totalPages del estado global que trae todos los paises y si es totalFilteredPages utiliza el estado local.

    const startIndex = (currentPage -1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalFilteredItems);


    //! esta funcion va hacer el filtrado de ordenamiento de "A" a la "Z", De la "Z" a la "A", y de max y min poblacion del pais
    const sortCountries = (countries, sortOrder)=>{
        return countries.slice().sort((a,b)=>{
            switch (sortOrder){
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
        if(newPage>= 1 && newPage <= totalUsedPages) {
            dispatch(setPage(newPage));
        }
    }

    useEffect(()=>{
        dispatch(setPage(1));
    },[selectedContinent, dispatch])

    const handleFilterChange = (newContinent)=>{
        setSelectedContinent(newContinent);
    }

    return (
            <div className={style.cardsContainer}>
            <div>
                {/*onChange es un evento en js y se ejecuta una funcion que especificas, en este caso, pasamos una call back y que cuando se ejecute "handleFilterChange" valla a la propiedad e.target.value y realize el filtro del continente que le pido. */}
                <select className={style.filters} onChange={(e)=> handleFilterChange(e.target.value)}>
                    <option value="ALL">ALL</option>
                    <option value="Asia">ASIA</option>
                    <option value="Americas">AMERICAS</option>
                    <option value="Africa">AFRICA</option>
                    <option value="Antarctic">ANTARCTIC</option>
                    <option value="Europe">EUROPE</option>
                    <option value="Oceania">OCEANIA</option>
                    <option value="">ACTIVIDAD</option>
                </select>

                <select className={style.filter} value={selectedSorting} onChange={(e)=> setSelectedSorting(e.target.value)}>
                    <option value="default">default</option>
                    <option value="A">A-Z</option>
                    <option value="Z">Z-A</option>
                    <option value="MAX">max population</option>
                    <option value="MIN">min population</option>
                </select>
            </div>
            <div className={style.cardsContainer}>
                 {
                sortCountries(filteredCountries, selectedSorting)
                ?.slice(startIndex, endIndex).map((coun) => {
                    return(<Card key={coun.id} coun={coun} />);
                })
            }
            </div>
            <div className={style.pagination}>
            <button className={style.button} onClick={()=> handlePageChange(currentPage - 1)}> Previous </button>
            <p>
                Page {currentPage} of {totalFilteredPages}
            </p>
            <button className={style.button} onClick={()=> handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};
