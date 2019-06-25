import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResumeFileUpload from '../../components/utils/form/ResumeFileUpload';
import Resume from '../../components/resume/Resume';
import Layout from '../../components/Layout/Layout';

class ResumeUploadPage extends Component {   

    state = {
        x: null,
        y: null,
        isOn:false,
        status: navigator.onLine

    }
    componentDidMount() {
        document.title = `CraveJs | ${this.props.auth.user.name}'s Resume` ;
        window.addEventListener('mousemove',this.handleMouseMove);
        window.addEventListener('online',this.handleOnLine);
        window.addEventListener('offline',this.handleOffLine);
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove',this.handleMouseMove);
        window.removeEventListener('online',this.handleOnLine);
        window.removeEventListener('offline',this.handleOffLine);
    }

    handleOnLine = () => {
        this.setState({status:true})
    }

    handleOffLine = () => {
        this.setState({status:false})
    }
    
    handleMouseMove = event => { 
        this.setState({
            x:event.pageX,
            y:event.pageY
        })
    }

    toggleLight = () => {
        this.setState( prevState => ({
            isOn: !prevState.isOn
        }))
    }
     
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        let links;
        if (!isAuthenticated) links = [
            {
                title: 'Login',
                linkTo: '/login' 
            },
            {
                title: 'Posts',
                linkTo: '/posts' 
            },
            {
                title: 'Products',
                linkTo: '/products' 
            },
        ];
        else {
            links =  [
                {
                    title: `${user.name}`,
                    linkTo: `/dashboard` 
                },
                {
                    title: 'Dashboard',
                    linkTo: '/dashboard' 
                },
                {
                    title: 'Posts',
                    linkTo: '/posts' 
                },
                {
                    title: 'Products',
                    linkTo: '/products' 
                },
                {
                    title: 'My Cart',
                    linkTo: '/cart' 
                },
                {
                    title: 'Logout',
                    linkTo: '/' 
                }
            ]
        }
    
        return (
            <Layout links = {links}>
             <>
                <ResumeFileUpload/>
                <Resume/>
            </>
            </Layout>
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ResumeUploadPage);