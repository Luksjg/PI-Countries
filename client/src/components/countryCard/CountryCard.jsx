import React from "react";
import styles from "./CountryCard.module.css"

export default function CountryCard({flags,name,continent,population}){
    
    return (
        <div className={styles.card}>
            <img src={flags} alt="imagen no encontrada" width='250px' height='125px'/>
            <h3>{name}</h3>
            <h5>{continent}</h5>
            <h5>{population}</h5>
        </div>
    );
}
