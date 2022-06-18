import axios from 'axios'

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const ORDER = 'ORDER';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY';
export const POST_ACTIVITY = "POST_ACTIVITY"


export function getCountries(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/countries');
        const data = json.data
        return dispatch({
            type: GET_COUNTRIES,
            payload: data
   
        })
    }
}

export const getCountry = (id) => dispatch => {
    return fetch ("http://localhost:3001/countries/" + id)
    .then(response => response.json())
    .then(data => {
        dispatch({
            type: GET_COUNTRY, 
            payload: data });
    });
};

export function getActivities(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/activities');
        return dispatch({
            type: GET_ACTIVITY,
            payload: json.data   
        })
    }
}


export function postActivity(payload){
    return async function(){
        let json = await axios.post('http://localhost:3001/activities', payload);
        return json;
    }
}

export function getByName(name){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/countries?name=' + name);
            console.log(json)
            if(json.data.length<1){
                return alert("Pais no encontrado :(")
            }else{
            return dispatch({
                type: GET_BY_NAME,
                payload: json.data
            })}
        } catch (error) {
            console.log('No se pudo encontrar el pais')
        }
    }
}

export function order(payload){
    return {
        type: ORDER,
        payload
    }
}

export function filterByContinent(payload){
    return {
        type: FILTER_CONTINENT,
        payload
    }
}

export function filterByActivity(payload){
    return {
        type: FILTER_ACTIVITY,
        payload
    }
}
