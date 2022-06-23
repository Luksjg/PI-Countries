import {React, useEffect} from 'react';
import { useParams } from 'react-router';
import { getCountry } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import ActivityCard from '../activityCard/ActivityCard.jsx'
import { Link } from 'react-router-dom';
import styles from "./CountryDetail.module.css"
import stylesErrors from "../Error/Errors.module.css"
import { useState } from 'react';
import loadingImg from "../../images/loadingWorld.gif"

const CountryDetail = () => {
    
    const {countryId} = useParams();
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        dispatch(getCountry(countryId));
        setTimeout(()=>{setLoading(false)},2000)
      }, [dispatch, countryId]);

    const country = useSelector((state) => state.country)

    let aux = 1


    if(loading){
    return(
        <img src={loadingImg} alt='cargando' className={styles.loadingImg}/>
    )
    }else{
    return (
        <div>  
            {!country.id ? 
            <div className={stylesErrors.bg}>
                <h1 className={stylesErrors.error}>404</h1>
                <p className={stylesErrors.messageError}>Country not found</p>
                <Link to={"/home"} className={stylesErrors.btn}>Volver</Link>
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
    )}
}

export default CountryDetail;
