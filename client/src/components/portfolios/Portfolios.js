import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Portfolio from '../portfolio/Porfolio';
import PorfolioHeader from './PorfolioHeader';
import { getPorfolio } from '../../actions/portfolioActions';
import LoadingSpinner from '../utils/LoadingSpinner';

const Portfolios = ({getPorfolio, portfolio: { portfolios, loading }}) => {
    useEffect( ()=>{
        getPorfolio();
    },[] )
    
    if (loading) return <LoadingSpinner/>
    console.log(portfolios);
    return (
        <div style = {{gridColumn: '1/-1'}}>
            <PorfolioHeader/>
            <div className = "Portfolios">
                {
                    portfolios.map( p => (
                            <Portfolio
                                key = {`${p._id}`}
                                name = {p.name}
                                description = {p.description}
                                displayUrl = {p.displayUrl}
                                url = {p.url}
                                live = {p.live}
                                imageUrl = {p.imageUrl}
                            />
                    ))
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    portfolio: state.portfolio
})

export default connect(mapStateToProps, { getPorfolio })(Portfolios);