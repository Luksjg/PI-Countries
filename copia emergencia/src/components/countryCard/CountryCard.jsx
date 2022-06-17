import React from "react";


export default function CountryCard({flags,name,continent,population,id}){
    
    return (
        <div>
            <img src={flags} alt="imagen no encontrada" width='250px' height='125px'/>
            <h3>{name}</h3>
            <h5>{continent}</h5>
            <h5>{population}</h5>
        </div>
    );
}
