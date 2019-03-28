
import React from 'react';

const Features = (props) => {
    return (
        <div className="Feature">
            <h4>{props.header}</h4>
            <p>{props.text}</p>
        </div>
    );
};

export default Features;