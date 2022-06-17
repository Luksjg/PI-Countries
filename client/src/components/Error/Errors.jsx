import React from 'react';
import {Link} from 'react-router-dom';
import './Errors.css';

export default function Errors(){
    return (
        <div className="ErrorContainer">
            <div>
                <h1>Pagina no encontrada</h1>
                <Link to="/">
                    <button>Home</button>
                </Link>
            </div>
        </div>
    )
}