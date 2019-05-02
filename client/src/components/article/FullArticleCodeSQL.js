import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';


class FullArticleCode extends Component {
    
    
render() {
    const codeString = `${this.props.code}`;
return (
        <>
           <SyntaxHighlighter language='sql' style={tomorrow}>{codeString}</SyntaxHighlighter>
        </>    
        );
    }
}

export default FullArticleCode;