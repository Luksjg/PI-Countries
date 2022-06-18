import {React, useEffect} from 'react';
import { useParams } from 'react-router';
import { getCountry } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import ActivityCard from '../activityCard/ActivityCard.jsx'
import { Link } from 'react-router-dom';
import styles from "./CountryDetail.module.css"


const CountryDetail = () => {
    
    const {countryId} = useParams();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getCountry(countryId));
      }, [dispatch, countryId]);

    const country = useSelector((state) => state.country)

    let aux = 1

    return (
        <div>  
            {!country.id ? 
            <div className={styles.errorC}>
                <p>Pais no encontrado</p>
                <Link to={"/home"} className={styles.btn}>Volver</Link>
            </div> : 
            <div key={country.name}>
                <div>
                <Link to='/home' className={styles.btn}> Volver </Link>
                </div>
                <div className={styles.countryC}>
                <img src={country.flags} alt={country.name}/>
                <p>País:{country.name}</p>
                <p>Continente:{country.continent}</p>
                <p>Capital: {country.capital} </p>
                <p>Subregión: {country.subregion}</p>
                <p>Área: {country.area} km2</p>
                <p>Población: {country.population} habitantes</p>   
                </div>  
                <div className={styles.activitiesGrid}>
                {country.activities && country.activities.map((activity) =>
                    <div key={aux++} className={styles.activitiesC}>
                        <ActivityCard 
                        name={activity.name} 
                        difficulty={activity.difficulty}
                        duration={activity.duration}
                        season={activity.season} />
                    </div>
                )}
                </div>
            </div>} 
        </div>
    )
}

export default CountryDetail;
