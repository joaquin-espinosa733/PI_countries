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
        <img src={flags}/>
        <div className={style.texto}>
            <h3>name: {name}</h3>
            <h4>Region: {region}</h4>
        </div>
    </div>
    )
}