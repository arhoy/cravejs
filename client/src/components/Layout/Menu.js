import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';

class Menu extends Component {
    
    logoutUserHandler(e) {
        e.preventDefault();
         // this.props.clearCurrentProfile();
        this.props.logoutUser();
      }
    
    render() {
        const { name } = this.props.auth.user;
        return (
            <div className = "Menu">
                <ul className="Menu__ul">
                    {
                        this.props.links.map( link => (
                            <Link
                                onClick={  link.title === 'Logout' ?  this.logoutUserHandler.bind(this) :null } 
                                key = { link.title } 
                                className = "Menu__link" 
                                to = {link.linkTo}
                                > 
                                {link.title} 
                            </Link>
                        ))
                    }
                </ul>
            </div>          
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser} )(withRouter(Menu));