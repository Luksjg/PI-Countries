import React from "react";
import {Link} from 'react-router-dom'
import "./LandingPage.module.css"


function LandingPage(){
    return (
        <div>
            <h1>Bienvenidos</h1>
            <Link to='/home'>
                hola
            </Link>
        </div>
    )
}

export default LandingPage;