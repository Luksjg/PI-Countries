import {React, useEffect} from 'react';
import { useParams } from 'react-router';
import { getCountry } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import ActivityCard from '../activityCard/ActivityCard.jsx'
import { Link } from 'react-router-dom';


const CountryDetail = () => {
    
    const {countryId} = useParams();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getCountry(countryId));
      }, [dispatch, countryId]);

    const country = useSelector((state) => state.country)

    return (
        <div key={country.name}>
            <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            </div>
            <img src={country.flags} alt={country.name}/>
            <div>
            <p>País:</p>
            <p>Continente:{country.continent}</p>
            <p>Capital: {country.capital}</p>
            <p>Subregión: {country.subregion}</p>
            <p>Área: {country.area} km2</p>
            <p>Población: {country.population} habitantes</p>
            <div>
            {country.activities && country.activities.map((activity) =>
                <div key={activity.name}>
                    <ActivityCard 
                    name={activity.name} 
                    difficulty={activity.difficulty}
                    duration={activity.duration}
                    season={activity.season} />
                </div>
            )}
            </div>
            </div>  
        </div>
    );
}

export default CountryDetail;
