import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearErrors } from '../../actions/authActions';
import { Link } from 'react-router-dom';



class Register extends Component {
 
    state = {
          name: '',
          email: '',
          password: '',
          password2: '',
          errors: {}
    
      }

      
    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
      
        this.props.clearErrors();
    }

      static getDerivedStateFromProps (props, state) {
        if(props.errors !== state.errors) {
        return {errors: props.errors}
        }
        return null;
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        };
    
         this.props.registerUser(newUser, this.props.history);
   
      }



    render() {
        const { errors } = this.state;
        const { signUpSuccess } = this.props.auth;
     
        return (
            <section className="section-register">
                <div className="row">
                    <div className="register">
                        <div className="register__form">
                            <form onSubmit = { (e) => this.onSubmitHandler(e) } className="form">
                            <div className="u-margin-bottom-medium">
                                <h2 className = "heading-secondary" style = {{color:'#333',fontWeight: '200'}} >
                                    Create your Account
                                </h2>
                            </div>


                                <TextFieldGroup
                                placeholder="Full Name"
                                name="name"
                                type = "text"
                                value={this.state.name}
                                onChange = { (e) => this.onChangeHandler(e) } 
                                error={errors.name}
                            />

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
                            
                            <TextFieldGroup
                                placeholder="Confirm Password"
                                name="password2"
                                type = "password"
                                value={this.state.password2}
                                onChange = {this.onChangeHandler.bind(this)} 
                                error={errors.password2}
                            />


                            <div className="form__group">
                                <button type = "submit" className="btn btn--primary">Create My Account</button>
                            </div>
                          {
                              signUpSuccess ? 
                              <div className = "register__success"> Signup success!</div>:
                              null
                          }
            
                        </form>
                        <p className = "form__info"> Already have an account? Sign in <Link className = "form__link" to = "/login"> Here </Link></p>
                      </div>
                   </div>
                </div>
        </section>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps, { registerUser, clearErrors })(withRouter(Register));