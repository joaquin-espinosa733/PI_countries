import { GET_COUNTRIES,GET_DETAIL_COUNTRIES,SET_TOTAL_PAGES,GET_ACTIVITY,SET_PAGE} from "./action-type";

const initialState = {
    countries: [],
    detail: {},
    activity:[],
    pagination:{
        thisPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
    }
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_COUNTRIES:
            return{...state, countries: action.payload};
        case GET_DETAIL_COUNTRIES:
            return {...state, detail: action.payload};
        case GET_ACTIVITY:
            return{...state, activity: action.payload};
        case SET_TOTAL_PAGES:
                return{
                    ...state,
                    pagination:{...state.pagination, totalPages: action.payload}
                };
        case SET_PAGE:
            return {
                ...state,
                pagination: { ...state.pagination, thisPage: action.payload },
              };
        default:
            return{...state};
    }
}

export default rootReducer;