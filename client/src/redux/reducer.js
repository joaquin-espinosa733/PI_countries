import {
    GET_COUNTRIES,
    GET_DETAIL_COUNTRIES,
    GET_ACTIVITY,
    SET_PAGE,
    POST_ACTIVITY,
    FILTER_ACTIVITIES,
    FILTER_CONTINENTS
} from "./action-type";

//* nuestro initialState de redux
const initialState = {
    countries: [],
    countriesSorted: [],
    detail: {},
    activity: [],
    pagination: {
        thisPage: 1,
        itemsPerPage: 10,
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                countriesSorted: action.payload,
            };
        case GET_DETAIL_COUNTRIES:
            return { ...state, detail: action.payload };
        case GET_ACTIVITY:
            return { ...state, activity: action.payload };
        case POST_ACTIVITY:
            return { ...state, activity: action.payload };

        case FILTER_CONTINENTS:
            const selectedContinent = action.payload;

            let filteredCountries = [];
            
            if (selectedContinent === "ALL") {
                filteredCountries = state.countries; //* Mostrar todos los países si se selecciona "ALL"
            } else {
                filteredCountries = state.countries.filter(country => country.region === selectedContinent);
            }
            return {
                ...state,
                countriesSorted: filteredCountries
            };

        case FILTER_ACTIVITIES:
            if (action.payload === "default") {
                return {
                    ...state,
                    countriesSorted: state.countries
                };
            }
            //* con el SOME en el array de  actividades de  cada pais vamos a verificar si al menos una actividad tiene un nombre que coincide con el valor de "action.payload"
            const filteredByActivitys = state.countries.filter(country =>
                country.activities.some(activity => activity.name === action.payload)
            );

            return {
                ...state,
                countriesSorted: filteredByActivitys
            };


        case SET_PAGE:
            return {
                ...state,
                pagination: { ...state.pagination, thisPage: action.payload },
            };

        default:
            return { ...state };
    }
}

export default rootReducer;