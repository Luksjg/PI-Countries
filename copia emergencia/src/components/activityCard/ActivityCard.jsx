import React from 'react';


const ActivityCard = (activity) => {

    return (
        <div>
            {activity && (
            <div>    
            <p>Actividad:{activity.name}</p>
            <p>Dificultad:{activity.difficulty}</p>
            <p>Duracion:{activity.duration}</p>
            <p>Temporada:{activity.season}</p>
            </div>
            ) }
        </div>
    );
};

export default ActivityCard;