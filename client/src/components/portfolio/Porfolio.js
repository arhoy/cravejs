import React from 'react';

const Porfolio = ({ title,description,url,displayUrl,image,link }) => {
    return (
        <div key = {title}>
            <img src= {`../../../public/img/portfolio/${image}`} alt= {title}/>
            <h2> {title} </h2>
            <p> {description} </p>

        </div>
    );
};

export default Porfolio;