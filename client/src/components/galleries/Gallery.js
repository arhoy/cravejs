import React, { Component } from 'react';


class Gallery extends Component {
    render() {
        return (
        <div className = "gallery">

            <figure className="gallery__item gallery__item--1">
                 <img src="img/pikto/compressed/angular.png" alt="" className="gallery__img gallery__img-1"/>
            </figure>
            <figure className="gallery__item gallery__item--2">
                <img src="img/pikto/compressed/firebase.png" alt="" className="gallery__img gallery__img-2"/>
            </figure>
            <figure className="gallery__item gallery__item--3">
                 <img src="img/pikto/compressed/github.png" alt="" className="gallery__img gallery__img-3"/>
            </figure>
            <figure className="gallery__item gallery__item--4">
                <img src="img/landingPage/node_g.png" alt="" className="gallery__img gallery__img-4"/>
            </figure>
            <figure className="gallery__item gallery__item--5">
                 <img src="img/landingPage/postman_g.png" alt="" className="gallery__img gallery__img-5"/>
            </figure>
            <figure className="gallery__item gallery__item--6">
                <img src="img/pikto/compressed/rpa.png" alt="" className="gallery__img gallery__img-6"/>
            </figure>
            <figure className="gallery__item gallery__item--7">
                 <img src="img/pikto/compressed/mongoose.png" alt="" className="gallery__img gallery__img-7"/>
            </figure>
            <figure className="gallery__item gallery__item--8">
                 <img src="img/landingPage/css_g.png" alt="" className="gallery__img gallery__img-8"/>
            </figure>
            <figure className="gallery__item gallery__item--9">
                <img src="img/landingPage/redux_g.png" alt="" className="gallery__img gallery__img-9"/>
            </figure>
            <figure className="gallery__item gallery__item--10">
                <img src="img/landingPage/graphql_g2.png" alt="" className="gallery__img gallery__img-10"/>
            </figure>
            <figure className="gallery__item gallery__item--11">
                <img src="img/landingPage/node_g2.png" alt="" className="gallery__img gallery__img-11"/>
            </figure>
            <figure className="gallery__item gallery__item--12">
                 <img src="img/landingPage/js_g.png" alt="" className="gallery__img gallery__img-12"/>
            </figure>
            <figure className="gallery__item gallery__item--13">
                <img src="img/pikto/compressed/react.png" alt="" className="gallery__img gallery__img-13"/>
            </figure>
            <figure className="gallery__item gallery__item--14">
              <img src="img/landingPage/es6.png" alt="" className="gallery__img gallery__img-14"/>
            </figure>
                  
        </div>
        );
    }
}

export default Gallery;