import React, { useEffect, Fragment } from 'react';

import { Helmet } from 'react-helmet'

import Developers from '../../components/developers/Developers';
import Layout from '../../components/Layout/Layout';
const DevelopersPage = () => {    
        useEffect( ()=>{
            document.title = 'Developers page | CraveJs'
        },[] )
        return (    
            <Fragment>
                <Helmet>
                    <title> List of Developers | Cravejs </title>
                    <meta 
                        name="description" 
                        content=
                            "List of developers on cravejs, search for profiles" 
                    />
                </Helmet>
                <Layout>
                    <Developers/>
                </Layout>
            </Fragment>           
        );
    }



export default DevelopersPage;