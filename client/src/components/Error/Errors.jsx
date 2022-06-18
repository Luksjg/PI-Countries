import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Errors.module.css';

export default function Errors(){
    return (
        <div className={styles.bg}>
            <h1 className={styles.error}>404</h1>
            <Link to="/home" >
                <button className={styles.btn}>Home</button>
            </Link>
        </div>
    )
}