import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class ProfileGithub extends Component {
    state = {
        count: 6,
        sort: 'created: asc',
        repos: []
    }

    componentDidMount() {
        const { username } = this.props;
        console.log(username)
        const { count, sort, clientId, clientSecret } = this.state;
    
        fetch(
          `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}`
        )
          .then(res => res.json())
          .then(data => {

            if (this.refs.myRef) {
              this.setState({ repos: data });
            }
          })
          .catch(err => console.log(err));
      }
    
      render() {
        const { repos } = this.state;
        const repoItems = repos.map(repo => (
            <div className = "ProfileCredential__items" key = {repo.name}> 
                <div className = "ProfileCredential__item" style = {{fontSize: '2rem'}}>{repo.name}</div>
                <div className = "ProfileCredential__item"> { repo.description } </div>
                <div className = "ProfileCredential__item"> Stars: { repo.stargazers_count } </div>
                <div className = "ProfileCredential__item"> Watchers: { repo.watchers_count } </div>
                <div className = "ProfileCredential__item"> Forks: { repo.forks_count } </div>
                <div className = "ProfileCredential__item"> View: { repo.html_url } </div>
            </div> 
        ));
        
        
        
        return (
          <div className = "ProfileCredential">
                {
                    repos.length > 0 ? repoItems : <div style = {{color: 'white'}}> Could not get repo items at this time</div>
                }
          </div>
        );
      }
    }
    
    ProfileGithub.propTypes = {
      username: PropTypes.string.isRequired
    };
    
    export default ProfileGithub;
    