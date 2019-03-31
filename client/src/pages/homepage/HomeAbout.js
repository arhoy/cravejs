import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LightSpeed from 'react-reveal/LightSpeed'
const HomeAbout = ({pageYOffset,homeAboutDOMOffset, windowHeight}) => {

    var css_box = 'css_box';
    
    const showBoxes = () => {
        css_box += ' css_box-show'; // append -show styles ( space is important 
    }
    if( pageYOffset > homeAboutDOMOffset + windowHeight/2.2) {
            showBoxes();
    }

    return (
        <div className = "HomeAbout">
               <div className="HomeAbout__section HomeAbout__section-1">
                    <LightSpeed left> 
                        <h2>Showcase your skills</h2>
                    </LightSpeed>   
                    <div className = "HomeAbout__mission" >
                        Cravejs is a community of lifelong learners 
                        in all areas of life who want to showcase their skills and potential, learn from others
                        and share their knowledge along the way
                    </div>
               </div>
               
              <div className="HomeAbout__section HomeAbout__section-2">
                        <div className=  {`css_box_container css_box_container-1`} >
                            <div className= {`${css_box} css_box-1`}>
                                     <FontAwesomeIcon
                                        icon="chart-line"
                                        style = {{color:'white', cursor:'pointer',fontSize: '4.5rem'}}
                                    />
                                    <span>power bi</span> 
                            </div>
                            <div className= {`${css_box} css_box-2`}>
                                     <FontAwesomeIcon
                                        icon="code"
                                        style = {{color:'white', cursor:'pointer',fontSize: '4.5rem'}}
                                    />
                                    <span>javascript</span> 
                            </div>
                            <div className= {`${css_box} css_box-3`}>
                                      <FontAwesomeIcon
                                        icon="database"
                                        style = {{color:'white', cursor:'pointer',fontSize: '4.5rem'}}
                                      />
                                       <span>sql</span> 
                            </div>
                        </div>
              </div>
              <div className="HomeAbout__section HomeAbout__section-3">
              <div className=  {`css_box_container css_box_container-2`} >
                         <div className= {`${css_box} css_box-4`}>
                                     <FontAwesomeIcon
                                        icon="chart-line"
                                        style = {{color:'white', cursor:'pointer',fontSize: '4.5rem'}}
                                    />
                                    <span>tableau</span> 
                            </div>
                            <div className= {`${css_box} css_box-5`}>
                                     <FontAwesomeIcon
                                        icon="code"
                                        style = {{color:'white', cursor:'pointer',fontSize: '4.5rem'}}
                                    />
                                    <span>css</span> 
                            </div>
                            <div className= {`${css_box} css_box-6`}>
                                      <FontAwesomeIcon
                                        icon="database"
                                        style = {{color:'white', cursor:'pointer',fontSize: '4.5rem'}}
                                      />
                                       <span>mongo db</span> 
                            </div>
                    </div>
              </div>
              <div className="HomeAbout__section HomeAbout__section-4">
              <div className=  {`css_box_container css_box_container-1`} >
                            <div className= {`${css_box} css_box-7`}>
                                     <FontAwesomeIcon
                                        icon="chart-line"
                                        style = {{color:'white', cursor:'pointer',fontSize: '4.5rem'}}
                                    />
                                    <span>rpa</span> 
                            </div>
                            <div className= {`${css_box} css_box-8`}>
                                     <FontAwesomeIcon
                                        icon="code"
                                        style = {{color:'white', cursor:'pointer',fontSize: '4.5rem'}}
                                    />
                                    <span>node</span> 
                            </div>
                            <div className= {`${css_box} css_box-9`}>
                                      <FontAwesomeIcon
                                        icon="database"
                                        style = {{color:'white', cursor:'pointer',fontSize: '4.5rem'}}
                                      />
                                       <span>graphql</span> 
                            </div>
                    </div>
              </div>
              <div className="HomeAbout__section HomeAbout__section-5">
                        <h4> Create Profile </h4>
                        <p>
                            Create a custom professional profile, where others can leave comments. 
                            This can be thought of as your "professional wall".
                        </p>
              </div>
              <div className="HomeAbout__section HomeAbout__section-6">
                        <h4> Browse Articles </h4>
                        <p>Browse through an array of articles and online resources from <span>Power BI</span> to javascript
                        </p>
              </div>
              <div className="HomeAbout__section HomeAbout__section-7">
                        <h4> Return the favour </h4>
                        <p> 
                            Share your knowledge with others in your area of expertise. Interested in publishing articles? Contact us!
                        </p>
              </div>

        </div>
    );
};

export default HomeAbout;