import React from "react";
import { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getCountries, filterByContinent, filterByActivity, getActivities, orderName}  from "../../actions"
import {Link} from 'react-router-dom'
import CountryCard from '../countryCard/CountryCard.jsx'
import Paginado from "../paginado/Paginado.jsx"
import Nav from "../nav/Nav.jsx";


export default function Home(){
    const dispatch = useDispatch();

    const allCountries = useSelector((state) => state.countries)

    const allActivities = useSelector((state) => state.activities)
    
    const [currentPage, setCurrentPage] = useState(1)

    const [order, setOrder] = useState('')
    
    
    const countriesPage = 9
    const LastCountry = currentPage * countriesPage
    const FirstCountry = LastCountry - countriesPage
    const currentCountries = allCountries.slice(FirstCountry, LastCountry)


    const paginado = (totalPages)=>{
        setCurrentPage(totalPages);
    }

    
    const changeOrder = (e) => {
        e.preventDefault()
        setOrder(e.target.value)
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)
    }

    function handleFilterContinent(e){
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterActivity(e){
        dispatch(filterByActivity(e.target.value))
    }


    useEffect(() => {
        dispatch(getCountries(),
        dispatch(getActivities()));
    }, [dispatch, order])


    return (
        <div>
            <div><Link to={"/"}><h1>Countries</h1></Link></div>

            <div><Link to={"/activity"}>Crear actividad</Link></div>

            <div><Nav/></div>

            <div>
                <div>
                <label>Ordenar por poblacion</label>
                <select onChange={e => changeOrder(e)} > 
                    <option value="ASC">Ascendente</option>
                    <option value="DESC">Descendente</option>
                </select>

                <label>Ordenar por nombre</label>
                <select onChange={e => handleSort(e)} >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <label>Ordenar por continente</label>
                <select onChange={e => handleFilterContinent(e)} >
                    <option value="All">Todos</option>
                    <option value="Africa">Africa</option>
                    <option value="North America">America del Norte</option>
                    <option value="South America">America del Sur</option>
                    <option value="Antarctica">Antartica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="Oceania">Oceania</option>
                </select>

                <label>Actividades</label>
                <select onChange={e => handleFilterActivity(e)} >
                    <option value="All">Todas</option>
                    { allActivities && allActivities.map(activity => (
                        <option value={activity.name}>{activity.name}</option>
                    ))}
                </select>
                </div>

          
                <ul>
                {  currentCountries?.map(country => (
                    <div key={country.id}>
                    <Link to={'/home/' + country.id}>
                    <CountryCard 
                    name={country.name} 
                    flags={country.flags} 
                    continent={country.continent}
                    id={country.id}
                    population={country.population}
                    key={country.id}/>
                    </Link>
                    </div>
                ))}
                </ul>
                
                <Paginado 
                    countriesPage={countriesPage}
                    allCountries={allCountries.length}
                    paginado={paginado}
                />
            </div>
        </div>
    )
}



