import React from 'react'

import PropTypes from 'prop-types'
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { connect } from 'react-redux';
import mainLinks from '../../utils/Links/mainLinks';
import SearchResults from '../../components/searchResults/searchResults';

const SearchResultsPage = ({ auth: { user, isAuthenticated }, history: {location} }) => {
    const links = mainLinks(isAuthenticated, user);
    console.log(location);
        return (
            <div className = "SearchResults-container">
                <Header links = {links} />
                    <SearchResults/>
                <Footer/>
            </div>
        )
}

SearchResultsPage.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchResultsPage)
