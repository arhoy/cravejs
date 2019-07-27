import React from 'react';

const Porfolio = ({ name, description,url,displayUrl,imageUrl }) => {
    
    
    return (
        <a className = "Portfolio" href = {url} target = "_blank" rel = "noopener noreferrer" >
                <div className = "Portfolio__side Portfolio__side-front">
                        {/* <img src={imageUrl} alt=""/> */}
                       
                        <h2> { name } </h2>
                </div>
                <div className = "Portfolio__side Portfolio__side-back">
                        <h2> {name} </h2>
                        <p> {description} </p>
                        <button> {displayUrl} </button>
                </div>
            
        </a>
    );
};

export default Porfolio;