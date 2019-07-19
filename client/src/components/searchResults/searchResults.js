import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SearchResults = ({search: {loading, searchResults, error}, history}) => {
    
    const goToLink = url => {
        const link = url.replace(/^http:\/\//i, 'https://').replace("https://www.cravejs.com/","/");
        console.log(link);
        history.push(link);
    }

    if(searchResults){

        return (
            <div className = "SearchResults">
            { 
                error && error.msg ? 
                <div> Oops could not find what you were looking for </div> :
                <Fragment>
                    <h2 className = "SearchResults__header"> There was {searchResults.length} results found </h2>
                    <ul>
                    { searchResults && searchResults.map( (result,i) => (
                        <div onClick = { goToLink.bind(this,result.link) } className = "SearchResults__link" to = {result.link} key = {`${i} - ${result.title}`} > 
                            <h4> { result.title } </h4>
                            <p> {result.snippet}  </p>
                        </div>
                    )) }
                    </ul>
                </Fragment>
          
            }

            </div>
        )      
    }
}

const mapStateToProps = state => ({
    search: state.search
})

export default connect( mapStateToProps )(withRouter(SearchResults))
