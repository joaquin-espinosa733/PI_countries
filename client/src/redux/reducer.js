import { GET_COUNTRIES,GET_DETAIL_COUNTRIES } from "./action-type";

const initialState = {
    countries: [],
    detail: {},
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_COUNTRIES:
            return{...state, countries: action.payload};
        case GET_DETAIL_COUNTRIES:
            return {...state, detail: action.payload};
        default:
            return{...state}
    }
}

export default rootReducer;