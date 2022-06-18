import React from "react";
import {Link} from 'react-router-dom'
import "./LandingPage.module.css"
import styles from "./LandingPage.module.css"

function LandingPage(){
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Countries</h1>
            <Link to='/home'className={styles.btn}>
                ingresar
            </Link>
        </div>
    )
}

export default LandingPage;