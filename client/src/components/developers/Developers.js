import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import LoadingSpinner from '../utils/LoadingSpinner';
import Developer from './Developer';


class Developers extends Component {
    state = {
        filteredProfiles: [],
        keyword: '',
        profiles: []

    }
    componentDidMount() {
        this.props.getProfiles();
        
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps',prevProps.profile)
        if(prevProps.profile.profiles !== this.props.profile.profiles){
            console.log('udpate the state')
            this.setState({profiles: this.props.profile.profiles})
        }
      
    }
    inputChangeHandler = (e) => {
        const keyword = e.target.value;
        
        const filteredProfiles = this.state.profiles.filter(profile => {
            if(!profile.handle) {
                profile.handle = '';
            }
            if(!profile.user){
                profile.user = {}
                profile.user.name = '';
            }
            if(!profile.headline){
                profile.headline = '';
            }
            return (
                profile.handle.toLowerCase().includes(keyword.toLowerCase().trim()) ||
                profile.user.name.toLowerCase().includes(keyword.toLowerCase().trim()) ||
                profile.headline.toLowerCase().includes(keyword.toLowerCase().trim()) 
            )
        })
       this.setState({filteredProfiles,keyword});
    }
    
    
    render() {
        console.log(this.props);
        const { profiles,filteredProfiles } = this.state;
        if( !profiles || profiles.length < 1 ) {
            return (
                <div className = "products__loading">
                    <div>
                        Getting Network of Developers
                    </div>
                    <div>Try reloading page if loading persists...</div>
                    <LoadingSpinner/>
                </div>
            ) 
        }
        else {
            const developersToLoop = this.state.keyword === '' ? profiles : filteredProfiles
            return (
                <React.Fragment>
                    <input onChange = { this.inputChangeHandler } className = "products__input" type="text" placeholder = "Search for profiles"/>
                    <div className = "products">
                    {
                        this.state.keyword !== '' && this.state.filteredProfiles.length === 0 ? 
                            <div className = "products__noResults"> Sorry, no results found!  </div>
                        :
                        developersToLoop.map(developer=> {
                            if(developer.user){
                                return (
                                    <Developer
                                        key = { developer._id }
                                        name = { developer.user.name }
                                        avatar = { developer.user.avatar }
                                        handle = { developer.handle }
                                        headline = { developer.headline }
                                    />
                                )
                            }
                        })
                    }
                    </div>
                </React.Fragment>
               
            );
        }
       
    }
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps , { getProfiles })(Developers);