import { NavLink } from "react-router-dom";
import style from "./landingPage.module.css"


export default function LandingPage(){
    return( 
    <div className={style.container}>
    <NavLink to={"/home"}>
        <button>Ir al inicio</button>
    </NavLink>
    </div>
    )
}