import React from 'react';
import styles from "./Paginado.module.css"

export default function Paginado ({countriesPage, allCountries,paginado,setCountriesPage}) {
    const pageNumbers = [];
    
    for(let i=1; i<=Math.ceil(allCountries / countriesPage); i++){
        pageNumbers.push(i);
    }
       
    return(
        <nav className={styles.pageNumbers}>
            <ul>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className={styles.numbers} key={number}> 
                            <button className={styles.number} onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))
                }     
              
            </ul>

        </nav>
    )
}