import React from 'react';
import ArticleMenu from './ArticlesMenu';

const ArticlesInput = ({inputChangeHandler}) => {
    return (
    
            <div className="ArticlesHeader"> 
                <div className = "ArticlesHeader__menu">
                    <ArticleMenu
                        className = "ArticleMenu"
                    /> 
                </div>
                <div className = "ArticlesHeader__input">
                    <input onChange = { inputChangeHandler } className = "Articles__input" type="text" placeholder = "Search Articles"/>
                </div>
                   
            </div>
    
    );
};

export default ArticlesInput;