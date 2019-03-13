import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navigation extends Component {
    state = {
        isOpen: false
    }

    logoutUserHandler(e) {
        e.preventDefault();
         // this.props.clearCurrentProfile();
        this.props.logoutUser();
      }
    onNavToggleHandler = () => {
        this.setState({isOpen:!this.state.isOpen});
    }
    render() {
        const { user, isAuthenticated } = this.props.auth;
        let displayName;
        if (user && user.name ) { displayName = user.name.split(' ')[0]; }
        
        const guestLinks = (
            <ul className="navigation__list">
                <li> <Link to = "/posts" className = "navigation__link">Daily Feed</Link> </li>
                <li> <Link to = "/products" className = "navigation__link" >Products</Link></li>
                <li> <Link to = "/login" className = "navigation__link">Login</Link> </li>
                <li> <Link to = "/register" className = "navigation__link">Create Account</Link> </li>
                <li> <Link to = "/about-us" className = "navigation__link" >About Us</Link></li>
                
            </ul>   
        )

        const authLinks = (
            <ul className="navigation__list">
                <li> <Link to = "/dashboard" className = "navigation__link">{ `${displayName}'s `} Dashboard</Link> </li>
                <li> <Link to = "/posts" className = "navigation__link" >Posts</Link> </li>
                <li> <Link to = "/products" className = "navigation__link" >Products</Link></li>
                <li> <Link to = "/cart" className = "navigation__link" >Cart</Link> </li>
                <li> <Link to = "/orders" className = "navigation__link" >Orders</Link> </li>
                <li className="">
                <a
                    href=""
                    onClick={this.logoutUserHandler.bind(this)}
                    className="navigation__link"
                >
                    <img
                    className="rounded-circle"
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '25px', marginRight: '5px' }}
                    title=""
                    />{' '}
                    Logout
                </a>
                </li>
            </ul>   
        )



        return (
                <div className="navigation">
                    <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

                    <label onClick = { this.onNavToggleHandler.bind(this)} htmlFor="navi-toggle" className="navigation__button">
                        <span className="navigation__icon">&nbsp;</span>
                    </label>
                    

                    {
                        this.state.isOpen ? 
                        <React.Fragment>
                            <div className="navigation__background">&nbsp;</div>
                            <nav className="navigation__nav">
                               {
                                   isAuthenticated ? authLinks : guestLinks
                               }
                            </nav>
                        </React.Fragment>
                        
                        :null
                    }
                    
                </div>
        )
    }
}

Navigation.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, { logoutUser })(Navigation);