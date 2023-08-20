import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCountriesDetail } from "../../redux/action";
import { Link } from "react-router-dom";


export default function Detail(){
    const {id} = useParams();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getCountriesDetail(id));
    },[dispatch,id]);
    
    const state = useSelector((state)=> state.detail);
    
    const countries = state;
    
    return(
        <div>
            <img src={countries.flags} alt={countries.name} />
            <p>id:{countries.id}</p>
            <p>name:{countries.name}</p>
            <p>Continente:{countries.region}</p>
            <p>Capital:{countries.capital}</p>
            <p>poblacion:{countries.population}</p>
        </div>
    )
}