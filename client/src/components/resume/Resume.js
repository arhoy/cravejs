import React, { Component } from 'react';
import { getResumes } from '../../actions/resumeActions';
import { connect } from 'react-redux';
import LoadingSpinner from '../utils/LoadingSpinner';

class Resume extends Component {
    componentDidMount() {
        this.props.getResumes();
    }
    
    render() {
        const { resumes, loading } = this.props.resume;
       //  console.log(resumes);
        return (
            <div 
                className = "Resume" 
            >
                {
                    loading 
                    ? 
                    <div className = "Resume__loading">
                            <div className = "Resume__loading-1">
                                Fetching your files
                            </div>
                            <div className = "Resume__loading-2">Try reloading page if loading persists...</div>
                            <div className = "Resume__loading-3">
                                <LoadingSpinner
                                    bgColor = '#0079BF'
                                />
                            </div>
                           
                    </div>
                    :  
                
                    <div className = "Resume__uploads">
               
                        {
                        resumes.map(resume => {
                            console.log(resume);
                            const indexStart = resume.public_id.lastIndexOf('/');
                            const displayName = resume.public_id.substring(indexStart + 1, resume.public_id.length);
                            // display like this if image file
                            if(resume.format === 'png'  || resume.format === 'jpg' || resume.format === 'jpeg') {
                                return (
                                    <div className = "Resume__image"  key = {resume.public_id}> 
                                        <img className = ""
                                            src={resume.url} alt={displayName}
                                        />
                                    </div>
                                )
                                
                            }
                            // provide as url link;
                            else {
                                return (
             
                                        <div className = "Resume__containerLink" >
                                            <a className = "Resume__link" href={resume.url} target = "_blank"> {displayName} </a>
                                        </div>
    
                                )
                            }
                        })
                    }
                    </div>    
                }
            </div>
        );
    }
}
const mapStateToProps = state => ({
    resume: state.resume
})
export default connect(mapStateToProps, {getResumes})(Resume);