import React, { Component } from 'react';
import { Link ,withRouter } from 'react-router-dom';

class Developer extends Component {

    showDetailsHandler = (handle) => {
        this.props.history.push(`/profile/${handle}`);
    }
    render() {
        const { name, avatar, handle, headline } = this.props;
    
        return (
            <div className = "Developer" onClick = { this.showDetailsHandler.bind(this,handle) }>
                <figure className = "Developer__figure">
                      <img className = "Developer__image"src= { avatar } alt={ avatar }/>
                </figure>
                <div className="Developer__name">  {name} </div>
                <div className="Developer__handle"> { handle }  </div>
                <div className="Developer__headline">  {headline} </div>
      
                    <Link className = "Developer__button link link__Developer" to = {`/profile/${handle}`} > 
                         View Full Profile
                     </Link>   
    
               
            </div>
        );
    }
}

export default withRouter(Developer);