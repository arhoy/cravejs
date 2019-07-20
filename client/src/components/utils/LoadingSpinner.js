import React from 'react';

const LoadingSpinner = ({bgColor}) => {
    return (
        <div className="lds-circle">
            <div style = {{backgroundColor: bgColor}} ></div>
        </div>

    );
};

LoadingSpinner.defaultProps = {
    bgColor: 'rgb(188, 217, 234)'
}

export default LoadingSpinner;


