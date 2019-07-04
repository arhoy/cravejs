import React from 'react';
import Gallery from '../../components/galleries/Gallery';
import Bounce from 'react-reveal/Bounce';

const GallerySection = () => {
    return (
        <div className = "HomeGallerySection">
                <Bounce top>
                <h4> Web and Self Development </h4>
                </Bounce>
               <Bounce bottom>
                    <Gallery/>
               </Bounce>
             
                
        </div>
    );
};

export default GallerySection;