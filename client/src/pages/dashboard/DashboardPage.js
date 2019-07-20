import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet'
import Dashboard from '../../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';

const DashboardPage = ({ auth: { user : { name } } }) => { 

        return (
            <Fragment>
                <Helmet>
                    <title> {name}'s Dashboard | CraveJs </title>
                    <meta 
                        name="description" 
                        content="Dashboard page for adding editing and viewing your CraveJs profile" 
                    />
                </Helmet>
                <Layout>
                        <Dashboard/>
                </Layout>
            </Fragment>
            
        );
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(DashboardPage);