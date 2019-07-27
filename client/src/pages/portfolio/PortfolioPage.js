import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import Portfolios from '../../components/portfolios/Portfolios';


const PortfolioPage = () => {                      
        return (
            <Fragment>
                 <Helmet>
                    <title> Portfolios Page | CraveJs </title>
                    <meta 
                        name="description" 
                        content=
                            "My website porfolio. Websites I have done web development for" 
                    />
                </Helmet>
                <Layout>
                    <Portfolios/>
                </Layout>
            </Fragment>
        );
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PortfolioPage);