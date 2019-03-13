import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

    onDeleteClick = (id) =>{
        this.props.deleteEducation(id);
    }
    render() {
        // const education = this.props.education;
        const education = this.props.education.map(edu=>(
            <tr className = "dashboardTable__row" key = {edu._id}>
                <td>{edu.school}</td>
                <td> {edu.degree} </td>
                <td> {edu.fieldofstudy} </td>
                <td>

               {moment.utc(edu.from).format("YYYY MMM")} - 
                {edu.to === null ? (
                    <div>
                        Present
                    </div>
                    
                ) : (
                    <div>
                      {moment.utc(edu.to).format("YYYY MMM")}  
                    </div>
                )}
                </td>
                <td>
                    <button
                        onClick={this.onDeleteClick.bind(this, edu._id)}
                        className="btn btn-2 btn--red"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));

    
    
        return (
            <div>
                <h4 className = "heading-secondary heading-secondary--blue" style = {{fontSize:'2.2rem'}}>Education Credentials</h4>
                      {
                        education.length > 0 ? 
                            <table className = "dashboardTable" >
                                <thead>
                                    <tr className = "dashboardTable__header">
                                        <th style = {{gridColumn: '1 / 2', backgroundColor:'white'}}>School</th>
                                        <th style = {{gridColumn: '2 / 3', backgroundColor:'white'}}>Degree</th>
                                        <th style = {{gridColumn: '3 / 4', backgroundColor:'white'}}>Major</th>
                                        <th style = {{gridColumn: '4 / 5', backgroundColor:'white'}}>Years</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {education}
                                </tbody>
                            </table>  :null
                      }
                    
                    <div className = "dashboard__addEducation">
                            <Link to = "/add-education" className = "btn-2 btn--blue" >
                                { education.length > 0 ? 'Add Another Education': 'Get Started!' }
                            </Link>
                    </div>
            </div>
        );
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, {deleteEducation})(Education);