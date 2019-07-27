import React from 'react';
import portfolioArr from './portfolioArr';
import Portfolio from '../portfolio/Porfolio';
import PorfolioHeader from './PorfolioHeader';

const Portfolios = () => {
    return (
        <div style = {{gridColumn: '1/-1'}}>
            <PorfolioHeader/>
            <div className = "Articles">
                {
                    portfolioArr.map( p => (
                            <Portfolio
                                key = {p.title}
                                title = {p.title}
                                description = {p.description}
                                displayUrl = {p.displayUrl}
                                link = {p.link}
                                live = {p.live}
                                image = {p.image}
                            />
                    ))
                }
            </div>
        </div>
    );
};

export default Portfolios;