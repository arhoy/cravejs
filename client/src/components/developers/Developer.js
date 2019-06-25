import React, { Component } from 'react';
import { Link ,withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'


class Developer extends Component {

    showDetailsHandler = (handle) => {
        this.props.history.push(`/profile/${handle}`);
    }
    render() {
        const { name, avatar, handle, headline, skills } = this.props;
    
    
        return (
   
                 <div 
                        className = "Developer"
                        onClick = { this.showDetailsHandler.bind(this,handle) }
                        data-tip data-for = {handle}
                      
                >
                        <figure className = "Developer__figure">
                            <img className = "Developer__image"src= { avatar } alt={ avatar }/>
                        </figure>
                        <div className="Developer__name">  {name} </div>
                        <div className="Developer__handle"> { handle }  </div>
                        <div className="Developer__headline">  {headline} </div>
        
                        <Link className = "Developer__button link link__Developer" to = {`/profile/${handle}`} > 
                            View Full Profile
                        </Link>   
                        <ReactTooltip
                                place="right"
                                type="dark" 
                                effect="solid"
                                className='extraClass' delayShow = {500}
                                id = {handle}
                        >
                            <div>
                                <h4>Top Skills</h4>
                                <ul>
                                    {
                                    skills.map( (skill,i) => {
                                        //show top three skills only
                                        if(i < 3){
                                            return ( 
                                                <li key = {i}>
                                                    {skill}
                                                </li>
                                            )
                                        }
                                    })
                                    }
                                </ul>
                            </div>
                        </ReactTooltip>
                           
                     
                </div>

          
           
            
           
        );
    }
}

export default withRouter(Developer);