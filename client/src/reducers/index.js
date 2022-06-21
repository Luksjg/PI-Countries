import {GET_COUNTRIES, POST_ACTIVITY, GET_COUNTRY, GET_BY_NAME, FILTER_CONTINENT, FILTER_ACTIVITY, GET_ACTIVITY, ORDER} from '../actions'

const initialState = {
    countries : [],
    allCountries : [],
    activities : [],
    country: []
}

function orderP( a, b ) {
    if ( a.population < b.population ){
      return -1;
    }
    if ( a.population > b.population ){
      return 1;
    }
    return 0;
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            } 
        case GET_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }      
        case GET_COUNTRY: return {
            ...state,
            country: action.payload
        }    
        case GET_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }    
        case POST_ACTIVITY:
            return {
                ...state,
            };
        case ORDER:
            let sortedCountries  
            if(action.payload === 'asc')sortedCountries = state.countries.sort((a,b) => a.name.localeCompare(b.name))
            else if(action.payload === "desc")sortedCountries = state.countries.sort((a,b) => b.name.localeCompare(a.name));
            else if(action.payload === "123")sortedCountries = state.countries.sort(orderP)
            else if(action.payload === "321")sortedCountries = state.countries.sort(orderP).reverse()
             return{
                ...state,
                countries: sortedCountries
            }    
        case FILTER_CONTINENT:
            const allCountries = state.allCountries
            const continentFilter = action.payload === 'All' ?
            allCountries : allCountries.filter(country => 
                country.continent === action.payload)    

            return{
                ...state,
                countries : continentFilter
            }   
        case FILTER_ACTIVITY:
            const allCountriesAct = state.allCountries
            const activitiesFilter = action.payload === 'All' ?
            allCountriesAct : allCountriesAct.filter(country => 
                country.activities && country.activities.map(el => el.name).includes(action.payload))

            return{
                ...state,
                countries: activitiesFilter
            }     
        default :
        return state;    
    }
}

export default rootReducer;