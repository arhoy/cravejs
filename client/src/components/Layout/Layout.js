import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { connect } from 'react-redux';


const BasicLayout = ({ children }) =>  {
    
        return (
                <div className = "layout">
                     <Header/>
                        {children}
                    <Footer/>
                </div>
        );

}



const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(BasicLayout);