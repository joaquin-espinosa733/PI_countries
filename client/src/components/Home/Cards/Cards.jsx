import Card from '../Card/Card'
import { useSelector } from "react-redux";
import style from "../Cards/Cards.module.css"

export default function Cards() {
    const countries = useSelector(state => state.countries)
    
    return (
            <div className={style.cardsContainer}>
            {
                countries?.map((coun) => {
                    return(<Card key={coun.id} coun={coun} />);
                })
            }
        </div>
    );
};
