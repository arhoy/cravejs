import React from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import mainLinks from '../../utils/links/mainLinks';
import SearchResults from '../../components/searchResults/searchResults';
import Layout from '../../components/Layout/Layout';

const SearchResultsPage = ({ auth: { user, isAuthenticated }}) => {
    const links = mainLinks(isAuthenticated, user);
        return (
          <Layout link = { links }>
              <SearchResults/>
          </Layout>
        )
}

SearchResultsPage.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchResultsPage)
