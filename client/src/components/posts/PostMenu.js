import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

class PostMenu extends Component {
    
    logoutUserHandler(e) {
        e.preventDefault();
         // this.props.clearCurrentProfile();
        this.props.logoutUser();
      }
    
    render() {
        const { name } = this.props.auth.user
        const { isAuthenticated } = this.props.auth;
        console.log(this.props);
        return (
            <div className = "PostMenu">
                <ul className="PostMenu__ul">

                        <Link 
                            className = "PostMenu__link" 
                            to = { isAuthenticated ? '/dashboard' : '/login'  }
                        > 
                            { isAuthenticated ? name : 'Login'} 
                        </Link>
                    
                        <Link className = "PostMenu__link" to = "/dashboard"> Account </Link>
                
                        <Link className = "PostMenu__link" to = "/dashboard"> View Profile </Link>
                   
                        <Link className = "PostMenu__link" to = "/orders"> Orders </Link>

                        <Link className = "PostMenu__link" to = "/products"> Products </Link>
                         
                        <Link className = "PostMenu__link" to = "/posts"> Posts </Link>
                            {
                                isAuthenticated ? 
                                <Link to = "/" className = "PostMenu__link" onClick={this.logoutUserHandler.bind(this)} > Logout </Link>
                                :null
                            }
                       
                    
                </ul>
            </div>          
        );
    }
}

PostMenu.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser} )(withRouter(PostMenu));