import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser ,clearErrors } from '../../actions/authActions';
import { Link } from 'react-router-dom';

class Login extends Component {
 
    state = {
          email: '',
          password: '',
          errors: {}
    
      }

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        this.props.clearErrors();
    }
    

    static getDerivedStateFromProps (props, state) {
        console.log(state);
        if(props.errors !== state.errors) {
        return {errors: props.errors}
        }
        if (props.auth.isAuthenticated) {
            props.history.push('/dashboard');
          }
        return null;
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const userData = {
          email: this.state.email,
          password: this.state.password
        };
    
         this.props.loginUser(userData, this.props.history);

      }

    render() {

        const { errors } = this.state;
        return (
            <section className="section-login">
                <div className="row">
                    <div className="login">
                        <div className="login__form">
                            <form onSubmit = { (e) => this.onSubmitHandler(e) } className="form">
                            <div className="u-margin-bottom-medium">
                                <h2 className = "heading-secondary" style = {{color:'#333',fontWeight: '200'}} >
                                    Login to your account
                                </h2>
                            </div>

                            <TextFieldGroup
                                placeholder="Email"
                                name="email"
                                type = "email"
                                value={this.state.email}
                                onChange = {this.onChangeHandler.bind(this)} 
                                error={errors.email}
                            />

                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type = "password"
                                value={this.state.password}
                                onChange = {this.onChangeHandler.bind(this)} 
                                error={errors.password}
                            />
                            

                            <div className="form__group">
                                <button type = "submit" className="btn btn--primary">Sign In</button>
                            </div>
                        </form>
                        <p className = "form__info"> Don't have an account yet? Create one <Link className = "form__link" to = "/register"> Here </Link></p>
                      </div>
                   </div>
                </div>
        </section>
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps, { loginUser, clearErrors })(withRouter(Login));