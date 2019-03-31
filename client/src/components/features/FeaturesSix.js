import React, { Component } from 'react';
import Feature from './Feature';

class FeaturesSix extends Component {
    render() {
        const { features } = this.props;
        return (
            <div className = "FeaturesSix">
                {
                    features.map( (feature,i) => (
                        <Feature
                            key = {i}
                            header = {feature.headline}
                            text = {feature.description}
                         />
                    ))
                }
            </div>
        );
    }
}

export default FeaturesSix;