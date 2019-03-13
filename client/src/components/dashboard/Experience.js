import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteExperience } from '../../actions/profileActions';


class Experience extends Component {

    onDeleteClick = (id) =>{
        this.props.deleteExperience(id);
    }
    render() {
        // const experience = this.props.experience;
        const experience = this.props.experience.map(exp=>(
            <tr className = "dashboardTable__row" key = {exp._id}>
                <td>{exp.title}</td>
                <td> {exp.company} </td>
                 <td> {exp.location} </td>
                <td>

               {moment.utc(exp.from).format("YYYY MMM")} - 
                {exp.to === null ? (
                    <div>
                        Present
                    </div>
                    
                ) : (
                    <div>
                      {moment.utc(exp.to).format("YYYY MMM")}  
                    </div>
                )}
                </td>
                <td>
                    <button
                        onClick={this.onDeleteClick.bind(this, exp._id)}
                        className="btn btn-2 btn--red"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));

    
    
        return (
            <div>
                <h4 className = "heading-secondary heading-secondary--blue" style = {{fontSize:'2.2rem'}}>Work Experience </h4>
                    {
                        experience.length > 0 ? 
                            <table className = "dashboardTable" >
                                <thead>
                                    <tr className = "dashboardTable__header">
                                        <th style = {{gridColumn: '1 / 2', backgroundColor:'white'}}>Position</th>
                                        <th style = {{gridColumn: '2 / 3', backgroundColor:'white'}}>Company</th>
                                        <th style = {{gridColumn: '3 / 4', backgroundColor:'white'}}>Location</th>
                                        <th style = {{gridColumn: '4 / 5', backgroundColor:'white'}}>Years</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {experience}
                                </tbody>
                            </table>  :null
                    }
                    
                    <div className = "dashboard__addExperience">
                            <Link to = "/add-experience" className = "btn-2 btn--blue" >
                                { experience.length > 0 ? 'Add Another Experience': 'Get Started!' }
                            </Link>
                    </div>
                
            </div>
        );
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, {deleteExperience})(Experience);