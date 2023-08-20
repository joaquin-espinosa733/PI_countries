import Cards from "./Cards/Cards";
import {getCountries} from "../../redux/action"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import style from "./Home.module.css"


export default function Home() {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountries());
    },[dispatch]);
     return(
        <div className={style.container}>
            <h1 className={style.container}>Home</h1>
            <Cards></Cards>
        </div>
    );
}