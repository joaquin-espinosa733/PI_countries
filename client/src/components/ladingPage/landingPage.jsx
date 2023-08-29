//* importamos navLink que nos va a servir para crear un enlace de navegacion que poporciona señales visuales.
import { NavLink } from "react-router-dom";
import style from "./landingPage.module.css"


export default function LandingPage() {
    return (
        <div className={style.container}>
            <NavLink to={"/home"}>
                <img
                    className={style.imagen}
                    src="https://static.vecteezy.com/system/resources/previews/003/750/595/non_2x/world-planet-earth-free-vector.jpg"
                    alt="button_al_home"
                />
            </NavLink>
        </div>
    )
}