import React from 'react';

const LoadingSpinner = ({bgColor}) => {
    return (
        <div className="lds-circle">
            <div style = {{backgroundColor: bgColor}} ></div>
        </div>

    );
};

export default LoadingSpinner;