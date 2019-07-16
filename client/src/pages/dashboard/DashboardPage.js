import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet'
import Dashboard from '../../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/Links/mainLinks';

class DashboardPage extends Component { 

    render() {
          
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
      
        return (
            <Fragment>

                <Helmet>
                    <title> Your Dashboard Page for Developers | Cravejs </title>
                    <meta 
                        name="description" 
                        content=
                            "This is your dashboard page where you can showcase your skill, experience and education on cravejs" 
                    />
                </Helmet>
                <Layout links = {links}>
                        <Dashboard/>
                </Layout>

            </Fragment>
            
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(DashboardPage);