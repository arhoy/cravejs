import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from '../layout/Navigation';
import PostMenu from './PostMenu';


class PostHeader extends Component {

    state = {
        showMenu:false
    }

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }

    componentWillMount() {
        document.addEventListener('mousedown',this.handleClick,false);
    }  
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        document.removeEventListener('mousedown',this.handleClick,false);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

      showMenuHandler = () => {
        this.setState({showMenu:true})
    }


    handleClick = (e) => {
        if(this.node && this.node.contains(e.target)){
            // do nothing
            return;
        }
        // click outside, handle event
        this.handleClickOutside();
    }
    
    handleClickOutside = () => {

        this.setState({showMenu:false})
    }


    render() {
        const { auth } = this.props;
        const { user, isAuthenticated } = this.props.auth;
        let displayName;
        if (user && user.name ) { displayName = user.name.split(' ')[0]; }
       
        
        return (
            
            <div className = "PostHeader">
                <nav className="PostHeader__nav">
                    <div className="PostHeader__nav-left">
                        <div className="PostHeader__icon">
                                <span className="PostHeader__icon-1">C</span>
                                <span className="PostHeader__icon-2">js</span>
                        </div>
                        <div className="PostHeader__searchbar">
                                    <input type="text" placeholder = "search"/>
                        </div>
                    </div>

                    {
                        this.state.width < 450 ? 
                            <Navigation/>
                            :
                            <div className="PostHeader__nav-right">     
                                <Link className = "link link__black PostHeader__home" to = "/dashboard">
                                    <FontAwesomeIcon
                                        icon="igloo"
                                        style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                    />
                                        <span>Home</span> 
                                </Link>       
                                
                                <Link className = "link link__black PostHeader__network" to = "/dashboard">
                                    <FontAwesomeIcon
                                        icon="user-friends"
                                        style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                    />
                                    <span>Network</span> 
                                </Link> 
                        
                                <Link className = "link link__black PostHeader__jobs" to = "/dashboard">
                                    <FontAwesomeIcon
                                        icon="laptop-code"
                                        style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                    />
                                        <span>Jobs</span> 
                                </Link> 
                            
                                <div className = "link link__black PostHeader__login PostMenu-container" onClick = {this.showMenuHandler} >
                                    <FontAwesomeIcon 
                                        
                                        icon="user-astronaut"
                                        style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                    />
                                    <span>{ isAuthenticated ? 'Me ▼' : 'Login'}</span>
                                   
                                       <div
                                        ref = {node => this.node = node} 
                                       >

                                        { this.state.showMenu ? 
                                       <PostMenu 
                                       
                                        />
                                         :null
                                        }
                                       </div>
                                      
                                   

                                </div> 
                    
                                
                        </div>
                    }
                    
                </nav>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps,null)(PostHeader);