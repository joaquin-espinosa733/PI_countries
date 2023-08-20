import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCountriesDetail } from "../../../redux/action";
import style from "../Card/Card.module.css"

export default function Card({coun}){
    const {id,flags,name,region} = coun;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDetailClick=()=>{
        dispatch(getCountriesDetail(id));
        navigate(`/detail/${id}`)
    };

    return(
        <div 
        className={style.container} 
        onClick={handleDetailClick}
        >
        <img src={flags}/>
        <h3>name: {name}</h3>
        <p>Region: {region}</p>
        </div>
    )
}