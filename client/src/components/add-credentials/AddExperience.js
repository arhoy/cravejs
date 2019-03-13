import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';
import { Link ,withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class AddExperience extends Component {

    state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }
    static getDerivedStateFromProps (props, state) {
        if(props.errors !== state.errors) {
        return {errors: props.errors}
        }
        return null;
        }

    onSubmit(e) {
        e.preventDefault();
    
        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };
    
    this.props.addExperience(expData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    onCheck = (e) => {
        this.setState({ 
            current: !this.state.current,
            disabled: !this.state.disabled
         })
    }
    
    render() {
        const {errors} = this.state;
    

        return (
            <div className="section-addCredentials">
            <div className="addCredentials">
    
                

                  <div className = "createProfile__header"> 
                    <div> <Link className = "btn-2 btn--blue" to = "/dashboard"> Back to Dashboard </Link> </div>
                    <h2 className = "heading-secondary" style = {{color:'#0C3953'}}>Add Experience</h2>
                  </div>

             

                  <form onSubmit={ (e)=> this.onSubmit(e) }>
                        <TextFieldGroup
                        placeholder="* Company"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange.bind(this)}
                        error={errors.company}
                        />
                        <TextFieldGroup
                        placeholder="* Job Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange.bind(this)}
                        error={errors.title}
                        />
                        <TextFieldGroup
                        placeholder="Location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange.bind(this)}
                        error={errors.location}
                        />
                        <h6>From Date</h6>
                        <TextFieldGroup
                        name="from"
                        type="date"
                        value={this.state.from}
                        onChange={this.onChange.bind(this)}
                        error={errors.from}
                        />
                        <h6>To Date</h6>
                        <TextFieldGroup
                        name="to"
                        type="date"
                        value={this.state.to}
                        onChange={this.onChange.bind(this)}
                        error={errors.to}
                        disabled={this.state.disabled ? 'disabled' : ''}
                        />
                        <div className="form-check mb-4">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="current"
                            value={this.state.current}
                            checked={this.state.current}
                            onChange={this.onCheck.bind(this)}
                            id="current"
                        />
                        <label htmlFor="current" className="form-check-label">
                            Current Job
                        </label>
                        </div>
                        <TextAreaFieldGroup
                        placeholder="Job Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange.bind(this)}
                        error={errors.description}
                        info="Tell us about the the position"
                        cols="90"
                        rows = "15"
                        />

                       <input
                            style = {{
                            marginTop: '1rem',
                            padding: '1.5rem 4rem'
                    
                            }}
                            className="btn btn-2 btn--primary"
                            type="submit"
                            value="Submit"
                        />
                    
                  </form>
                </div>
              </div>

        );
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience:PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience) );