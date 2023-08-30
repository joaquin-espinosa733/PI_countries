import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCountriesDetail } from "../../../redux/action";
import style from "../Card/Card.module.css"

export default function Card({id,flags,name,region}){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleDetailClick=()=>{
        dispatch(getCountriesDetail(id));
        navigate(`/detail/${id}`)
    };

    return(
    <div className={style.container} onClick={handleDetailClick}>
        <div className={style.texto}>
            <h2>{name}</h2>
            <h3>{region}</h3>
        </div>
        <img src={flags} alt={`${name} flag`}/>
    </div>
    )
}