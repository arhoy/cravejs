import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import mainLinks from './links/mainLinks';


const Navigation = ({ logoutUser, auth: { user, isAuthenticated } }) => {
    const [isOpen, setIsOpen] = useState(false);


    const onNavToggleHandler = () => {
        setIsOpen(!isOpen);
    }

        if (user && user.name ) { const displayName = user.name.split(' ')[0]; }
        
    const links = mainLinks(isAuthenticated, user); 


        return (
                <div className="navigation">
                    <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

                    <label onClick = { onNavToggleHandler.bind(this)} htmlFor="navi-toggle" className="navigation__button">
                        <span className="navigation__icon">&nbsp;</span>
                    </label>
                    
            
                    {
                        isOpen ? 
                        <Fragment>
                            <div className="navigation__background">&nbsp;</div>
                            <nav className="navigation__nav">
                                <ul className="navigation__list">
                                {links.map( link => (
                                    <li key = {link.linkTo} > <Link to = { link.linkTo } className = "navigation__link" > { link.title } </Link> </li>
                                ) )}
                                </ul>
                            </nav>
                        </Fragment>
                        
                        :null
                    }
                    
                </div>
        )
}

Navigation.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, { logoutUser })(Navigation);