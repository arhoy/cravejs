import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './Navigation';
import Menu from './Menu';


class Header extends Component {

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
            
            <div className = "Header">
                <nav className="Header__nav">
                    <div className="Header__nav-left">
                        <div className="Header__icon">
                                <span className="Header__icon-1">C</span>
                                <span className="Header__icon-2">js</span>
                        </div>
                        <div className="Header__searchbar">
                                    <input type="text" placeholder = "search"/>
                        </div>
                    </div>

                    {
                        this.state.width < 450 ? 
                            <Navigation/>
                            :
                            <div className="Header__nav-right">     
                                <Link className = "link link__black Header__home" to = "/dashboard">
                                    <FontAwesomeIcon
                                        icon="igloo"
                                        style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                    />
                                        <span>Home</span> 
                                </Link>       
                                
                                <Link className = "link link__black Header__network" to = "/dashboard">
                                    <FontAwesomeIcon
                                        icon="user-friends"
                                        style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                    />
                                    <span>Network</span> 
                                </Link> 
                        
                                <Link className = "link link__black Header__jobs" to = "/dashboard">
                                    <FontAwesomeIcon
                                        icon="laptop-code"
                                        style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                    />
                                        <span>Jobs</span> 
                                </Link> 
                            
                                <div className = "link link__black Header__login Menu-container" onClick = {this.showMenuHandler} >
                                    <FontAwesomeIcon 
                                        
                                        icon="user-astronaut"
                                        style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                    />
                                    <span>{ isAuthenticated ? 'Me ▼' : 'Login'}</span>
                                   
                                       <div
                                        ref = {node => this.node = node} 
                                       >

                                        { this.state.showMenu ? 
                                       <Menu 
                                            links = {this.props.links}
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
export default connect(mapStateToProps,null)(Header);