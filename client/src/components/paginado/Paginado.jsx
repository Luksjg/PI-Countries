import React from 'react';
import styles from "./Paginado.module.css"

export default function Paginado ({allCountries,paginado}) {
    const pageNumbers = [];
    
    for(let i=1; i<=Math.ceil(allCountries / 10); i++){
        pageNumbers.push(i);
    }
       
    return(
        <nav className={styles.pageNumbers}>
            <ul>
                {pageNumbers.length > 0  &&
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