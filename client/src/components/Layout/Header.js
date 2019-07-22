import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './Navigation';
import { googleCustomSearch, clearGoogleCustomSearch } from '../../actions/searchActions';
import PropTypes from 'prop-types';
import Menu from './Menu';
import mainLinks from './links/mainLinks';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            width: 0, 
            height: 0,
            showMenu:false,
            showExploreLinks:false,
            query: '',
            exploreLinks: [
                {
                    title: 'Network',
                    linkTo: '/developers' 
                },
                {
                    title:'Articles',
                    linkTo:'/articles'
                }
            ]
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }

    componentWillMount() {
        document.addEventListener('mousedown',this.handleClickMe,false);
    
    }  
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        document.removeEventListener('mousedown',this.handleClickMe,false);
       
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

      showMenuHandler = () => {
        this.setState({showMenu:true})
    }
      showExploreLinkHandler = () => {
        this.setState({showExploreLinks:true})
    }


    handleClickMe = (e) => {
        if(this.node && this.node.contains(e.target)){
             if(e.target.className === 'header_nav_helper' || e.target.attributes.getNamedItem('data-icon') || e.target.attributes.fill ) this.handleClickOutside();
            return;
        }
        // click outside, handle event
        this.handleClickOutside();
    }

    handleClickOutside = () => {
     
        this.setState({
            showMenu:false,
            showExploreLinks:false
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    

    siteSearchHandler = e => {
        e.preventDefault();
        this.props.clearGoogleCustomSearch();
        this.props.googleCustomSearch(this.state.query);
        this.props.history.push('/search');
    }
   

    render() {
        const { user, isAuthenticated } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
                
        return (
            
            <div className = "Header">
                <nav className="Header__nav">
                    <div className="Header__nav-left">
                        <div className="Header__icon">
                                <span className="Header__icon-1">C</span>
                                <span className="Header__icon-2">js</span>
                        </div>
                        <div className="Header__searchbar">
                        
                            <form 
                                onSubmit = {this.siteSearchHandler.bind(this)}>
                            <div>
                                <input
                                    type="text" 
                                    id="site-search-google" 
                                    name="query" 
                                    title="Search Site" 
                                    alt="Search Text" maxLength="50" 
                                    placeholder = "Search Site" 
                                    value = { this.state.query }
                                    onChange={e => this.onChange(e)}
                                />
                            </div>
                            </form>
                        </div>
                    </div>
                    <div className="gcse-search"></div>
                    {
                        this.state.width < 450 ? 
                            <Navigation/>
                            :

                            <div className = "Header__nav-right"
                                ref = {node => this.node = node} 
                            >

                                     
                                        <Link className = "link link__black Header__home" to = {isAuthenticated ? "/dashboard": "/"}>
                                            <div className="header_nav_helper">
                                            <FontAwesomeIcon
                                                icon="igloo"
                                                style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                            />
                                            </div>
                                            <span className = "header_nav_helper">Home</span> 
                                        </Link>   

                                        
                            
                                
                                        <Link className = "link link__black Header__jobs" to = "/dashboard">
                                            <div className="header_nav_helper">
                                            <FontAwesomeIcon
                                                icon="laptop-code"
                                                style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                            />
                                            </div>
                                                <span className = "header_nav_helper">Jobs</span> 
                                        </Link> 
                                    
                                

                                        <div className = "link link__black Header__login Menu-container" onClick = {this.showExploreLinkHandler} >
                                             <div className="header_nav_helper">
                                            <FontAwesomeIcon 
                                                icon="user-friends"
                                                style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                            />
                                            </div>
                                            <span className = "header_nav_helper" onClick = {this.showExploreLinkHandler} >{ isAuthenticated ? 'Explore ▼' : 'Explore'}</span>
                                            { 
                                                    this.state.showExploreLinks ? 
                                                    <Menu links = {this.state.exploreLinks}/>
                                                    :null
                                            } 
                                            
                                        </div>    

                                        <div className = "link link__black Header__login Menu-container" onClick = {this.showMenuHandler} >
                                            <div className="header_nav_helper">
                                            <FontAwesomeIcon 
                                                icon="user-astronaut"
                                                style = {{color:'white', cursor:'pointer',fontSize: '2.5rem'}}
                                            />
                                            </div>
                                            <span className = "header_nav_helper">{ isAuthenticated ? 'Me ▼' : 'Login'}</span>
                                        
                                                { 
                                                    this.state.showMenu ? 
                                                    <Menu links = {links}/>
                                                    :null
                                                }  
                                        </div>  
                                </div>
         
                          
                    }
                    
                </nav>
            </div>
        );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    search: state.search
})


export default connect(mapStateToProps,{ googleCustomSearch, clearGoogleCustomSearch })(withRouter(Header));