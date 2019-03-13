import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';
import { Link ,withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import moment from 'moment';

class AddEducation extends Component {

    state = {
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:'',
        errors:{},
        disabled:false // if they click current then disable to.
    }
    static getDerivedStateFromProps (props, state) {
        if(props.errors !== state.errors) {
        return {errors: props.errors}
        }
        return null;
        }

    onSubmit(e) {
        e.preventDefault();
    
        const eduData = {
          school: this.state.school,
          degree: this.state.degree,
          fieldofstudy: this.state.fieldofstudy,
          from: moment.utc(this.state.from).format(),
          to: moment.utc(this.state.to).format(),
          current: this.state.current,
          description: this.state.description
        };
    
    this.props.addEducation(eduData, this.props.history);
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
        console.log(moment.utc(this.state.to).format());
        const {errors} = this.state;
    
            // Select options for status
        const degreeOptions = [
            { label: '* Select Education', value: 0 },
            { label: 'High School', value: 'High School' },
            { label: 'Associate Degree', value: 'Associate Degree' },
            { label: `Bachelor's Degree`, value: `Bachelor's Degree` },
            { label: `Master's Degree`, value: `Master's Degree` },
            { label: `Doctoral Degree`, value: `Doctoral Degree` }
        ];
        return (
            <div className="section-addCredentials">
            <div className="addCredentials">
                  <div className = "createProfile__header"> 
                    <div><Link className = "btn-2 btn--blue" to = "/dashboard"> Back to dashboard</Link></div>
                    <h2 className = "heading-secondary heading-secondary--blue">Add Education</h2>
                  </div>
                  <form onSubmit={ (e)=> this.onSubmit(e) }>
                    <TextFieldGroup
                      placeholder="Name of school"
                      name="school"
                      value={this.state.school}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.school}
                      info="What school/college/university do you attend?"
                    />
                     <SelectListGroup
                        placeholder="Degree Type"
                        name="degree"
                        value={this.state.degree}
                        onChange={ (e)=> this.onChange(e) }
                        options={degreeOptions}
                        error={errors.degree}
                     />
                    <TextFieldGroup
                      placeholder="Field of Study (ie. computing science )"
                      name="fieldofstudy"
                      value={this.state.fieldofstudy}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.fieldofstudy}
                    />
                    <TextFieldGroup
                      placeholder="From"
                      label = "From"
                      name="from"
                      type = "date"
                      value={this.state.from}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.from}
                    />
                    <TextFieldGroup
                      placeholder="To"
                      label = "To"
                      name="to"
                      disabled = { this.state.disabled ?  'disabled' : '' }
                      type = "date"
                      value={this.state.to}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.to}
                    />

                    <div className = "form-check mb-4">
                        <input 
                            type="checkbox"
                            className = "form-check-input"
                            name = "current"
                            value = { this.state.current }
                            checked = { this.state.current }
                            onChange = { (e)=> this.onCheck(e) }
                        />
                        <label htmlFor="current" className = "form-check-label" >
                            Degree in progress
                        </label>
                    </div>

                    <TextAreaFieldGroup
                        placeholder= {`Experiences, awards, highlights during your time at ${this.state.school? this.state.school : '?!'}`}
                        name="description"
                        value={this.state.description}
                        onChange={ (e)=> this.onChange(e) }
                        error={errors.description}
                        info="University/Education highlights in a nutshell"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation:PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation) );