import { NavLink } from "react-router-dom";


export default function LandingPage(){
    return( 
    <div>
    <NavLink to={"/home"}>
        <button>Ir al inicio</button>
    </NavLink>
    </div>
    )
}