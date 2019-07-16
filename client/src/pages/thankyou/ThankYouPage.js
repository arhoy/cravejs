import React, { Component } from 'react';
import Header from '../../components/Layout/Header';
import { connect } from 'react-redux';
import ThankYou from '../../components/thankyou/ThankYou';
import Footer from '../../components/Layout/Footer';
import mainLinks from '../../utils/Links/mainLinks';





class ThankYouPage extends Component {    
    render() {
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
        
        return (
            <React.Fragment>
                <Header links = {links}/>
                <div className = "thankyou-container">
                    <ThankYou/>
                </div>
                <Footer/>

            </React.Fragment>
           
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart
})

export default connect(mapStateToProps)(ThankYouPage);