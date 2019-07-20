import React from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';


const Menu = ({logoutUser, history, auth: { isAuthenticated,user }, links } ) => {
  
    const logoutUserHandler = e => {
        e.preventDefault();
         // this.props.clearCurrentProfile();
        logoutUser();
        // redirect to home page
        history.push('/');
      }
   
        return (
            <div className = "Menu">
                <ul className="Menu__ul">
                    {
                        links.map( link => (
                            <Link
                                onClick={  link.title === 'Logout' ?  logoutUserHandler.bind(this) :null } 
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



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser} )(withRouter(Menu));