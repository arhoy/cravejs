import React, { Fragment, useEffect } from 'react';
import Header from '../../components/Layout/Header';
import { connect } from 'react-redux';
import ThankYou from '../../components/thankyou/ThankYou';
import Footer from '../../components/Layout/Footer';



const ThankYouPage =  () => {    
        useEffect( () => {
            document.title = 'Thank you page';
        },[])
        return (
            <Fragment>
                <Header/>
                <div className = "thankyou-container">
                    <ThankYou/>
                </div>
                <Footer/>
            </Fragment> 
        );
}



const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart
})

export default connect(mapStateToProps)(ThankYouPage);