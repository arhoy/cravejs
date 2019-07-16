import React, { Component } from 'react';
import AddExperience from '../../components/add-credentials/AddExperience';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/Links/mainLinks';

class AddExperiencePage extends Component {    
    componentDidMount() {
        document.title = `Add Experience Page for ${this.props.auth.user.name}`;
    }
    
    render() {
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);

        return (
          
            <Layout links = {links}>
                 <AddExperience/>
            </Layout>
           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AddExperiencePage);