import  {
    GET_COUNTRIES,
    GET_DETAIL_COUNTRIES,
    GET_ACTIVITY,
    POST_ACTIVITY, 
    SET_PAGE,
    FILTER_ACTIVITIES,
    FILTER_CONTINENTS
} from "./action-type"
import axios from "axios";

export const getCountries= ()=> {
    //* parametro: dispatch, es una funcion de redux que se utiliza para enviar acciones al  reducer y actulizar el estado
    return async function(dispatch) {
        const apiCountries = await axios.get("http://localhost:3001/countries");
        const countries = apiCountries.data;
        //* payload la informacion que mandamos a los reducer:
        dispatch({type:GET_COUNTRIES, payload: countries})
    }
}


export const getCountriesDetail = (id)=> {
    return async(dispatch)=> {
        const response = await axios.get(`http://localhost:3001/countries/${id}`);
        const countries = response.data
        dispatch({type: GET_DETAIL_COUNTRIES, payload: countries});
    }
}

export const getActivity =()=>{
    return async (dispatch)=>{
        const response = await axios.get("http://localhost:3001/activities")
        const activity = response.data;
        dispatch({type: GET_ACTIVITY, payload: activity});
    };
};

export const postActivity = (form)=> {
    return async (dispatch)=>{
        const response = await axios.post("http://localhost:3001/activities", form);
        const newActivity = response.data;
        dispatch({type:POST_ACTIVITY, payload: newActivity});
    }
}

export const filterActivities = (payload)=> {
    return {
        type: FILTER_ACTIVITIES,
        payload
    }
}

export const filterContinents = (payload) =>{
    return{
        type: FILTER_CONTINENTS,
        payload,
    }
}
//* vamos a utilizar setPage para cambiar el numero de pagina actual en la paginacion
export const setPage = (page)=>{//* "page" representa el numero de pagina al que deseas cambiar
    return {
        type: SET_PAGE,
        payload: page,
    }
}