import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';

const NotFoundPage = () => {                      
        return (
            <Fragment>
                 <Helmet>
                    <title> Not found! | CraveJs </title>
                    <meta 
                        name="description" 
                        content=
                            "Sorry 404, not found!" 
                    />
                </Helmet>
                <Layout>
                    <div
                        style = 
                        {{gridColumn: '1 / -1',
                            textAlign: 'center', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems:'center',
                        justifyContent:'center'
                        }}
                    >
                        <h1>404, Not found</h1>
                        <p>The page you are looking for might have moved or does not exist! </p>
                        <p>Please navigate to a new page using the links above</p>
                    </div>
                </Layout>
            </Fragment>
        );
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(NotFoundPage);