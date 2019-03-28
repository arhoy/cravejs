import React, { Component } from 'react';
import Feature from './Feature';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
class FeaturesSix extends Component {
    render() {
        const { features } = this.props;
        console.log(features);
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