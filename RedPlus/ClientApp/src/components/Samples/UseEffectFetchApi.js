import React, { useState, useEffect } from 'react';

function UseEffectFetchApi() {

    const [forecasts, setForecasts] = useState(null); 

    useEffect(() => {
        fetch("/weatherforecast")
            .then(response => response.json())
            .then(setForecasts)
            .catch(console.error); 
    }, []);

    return (
        <>
            <h1>UseEffectFetchApi</h1>
            { JSON.stringify(forecasts) }
        </>    
    );
}

export default UseEffectFetchApi;
