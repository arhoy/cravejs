
import React from 'react';
import Fade from 'react-reveal/Fade'; 

const Features = (props) => {
    return (
        <Fade left cascade>
           <div className="Feature">
                <div className="Feature__icon">  
                </div>
                <h4>{props.header}</h4>
                <p>{props.text}</p>
            </div>
        </Fade>
     
    );
};

export default Features;