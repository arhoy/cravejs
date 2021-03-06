import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/articleActions';

const ArticlesMenu = ({getArticles}) => {

    const [article, setArticle] = useState('');
    const options = [
        { value: '', label: 'Select Articles...' },
        { value: 'reactPosts', label: 'React Articles' },
        { value: 'javascriptPosts', label: 'Javascript Articles' },
        { value: 'expressPosts', label: 'Express Articles' },
        { value: 'mongoDb', label: 'Mongoose Articles' },
        { value: 'blogPost', label: 'Miscellaneous Articles' }
    ]

    const setArticleHandler = e => {
        const query = `?contentType=${e.target.value}`
        setArticle(e.target.value)
        getArticles(query);
    }

    return (
        <select 
            name = "article_select_menu" 
            value = {article}  
            className = "ArticlesMenu__select"
            onChange = {setArticleHandler}
        >
            {
                options.map( option => (
                    <option 
                         key = {option.value} 
                         value = { option.value }
                         className = "ArticlesMenu__option"
                    > 
                        { option.label } 
                    </option>
                ))
            }
        </select>
    );
};

const mapStateToProps = state => ({
    articles: state.articles
})

export default connect(mapStateToProps, {getArticles})(ArticlesMenu);