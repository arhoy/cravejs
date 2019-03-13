import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
 

 
export default class LightboxExample extends Component {
 
  render() {

    const { 
        photoIndex, 
        isOpen, 
        className, 
        lightBoxName, 
        closeRequest,
        onViewImages, 
        images, 
        onMovePrevRequest, 
        onMoveNextRequest
    } = this.props;

 
    return (
      <div>
        <button className = {className} type="button" onClick= { onViewImages }>
          { lightBoxName }
        </button>
 
        {isOpen && (
          <Lightbox
            mainSrc = {images[photoIndex]}
            nextSrc = {images[(photoIndex + 1) % images.length]}
            prevSrc = {images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest = { closeRequest }
            onMovePrevRequest = { onMovePrevRequest }
            onMoveNextRequest = { onMoveNextRequest } 
          />
        )}
      </div>
    );
  }
}