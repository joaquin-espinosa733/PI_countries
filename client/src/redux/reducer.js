import {
    GET_COUNTRIES,
    GET_DETAIL_COUNTRIES,
    SET_TOTAL_PAGES,
    GET_ACTIVITY,
    SET_PAGE,
    POST_ACTIVITY,
    FILTER_ACTIVITIES,
    FILTER_CONTINENTS
} from "./action-type";

const initialState = {
    countries: [],
    countriesSorted: [],
    detail: {},
    activity: [],
    pagination: {
        thisPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countriesSorted: action.payload,
                countries: action.payload
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
                filteredCountries = state.countries; // Mostrar todos los países si se selecciona "ALL"
            } else {
                filteredCountries = state.countries.filter(country => country.region === selectedContinent);
            }

            return {
                ...state,
                countriesSorted: filteredCountries
            };

        case FILTER_ACTIVITIES:
            // console.log("Estado antes del filtro:", state);
            if (action.payload === "default") {
                return {
                    ...state,
                    countriesSorted: state.countries
                };
            }

            const filteredByActivitys = state.countries.filter(country =>
                country.activities.some(activity => activity.name === action.payload)
            );
            // console.log("Países filtrados:", filtered);
            return {
                ...state,
                countriesSorted: filteredByActivitys
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                pagination: { ...state.pagination, totalPages: action.payload }
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