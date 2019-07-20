import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SearchResults = ({search: {loading, searchResults, error, query}, history}) => {
    
    const goToLink = url => {
        const link = url.replace(/^http:\/\//i, 'https://').replace("https://www.cravejs.com/","/");
       
        history.push(link);
    }

    if(searchResults){

        return (
                error && error.msg ? 
                <div className = "SearchResults__summary"> Oops could not find what you were looking for </div> :

                <Fragment>
                    
                    { 
                        searchResults.length > 0 ? 
                            <div className = "SearchResults__summary">
                            There are { searchResults.length } results for <strong> {query} </strong> 
                            </div> : 
                            <div className = "SearchResults__summary">Please start searching at the top</div>
                    }
                  
                <div className = "SearchResults">  
                    <div className = "SearchResults__list">
                    { searchResults && searchResults.map( (result,i) => (
                        <div onClick = { goToLink.bind(this,result.link) } className = "SearchResults__link" to = {result.link} key = {`${i} - ${result.title}`} > 
                            <h4> { result.title } </h4>
                            <p> {result.snippet}  </p>
                        </div>
                    )) }
                    </div>
                </div>
                <div className = "SearchResults__message"> Still haven't find what you are looking for? Try the explore option above </div>
                </Fragment>
               
        )      
    }
}

const mapStateToProps = state => ({
    search: state.search
})

export default connect( mapStateToProps )(withRouter(SearchResults))
