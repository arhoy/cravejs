import React, { Component, Fragment } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

class FullArticleCode extends Component {
  render() {
    const codeString = `${this.props.code}`;
    return (
      <Fragment>
        <SyntaxHighlighter language={this.props.language} style={tomorrow}>
          {codeString}
        </SyntaxHighlighter>
      </Fragment>
    );
  }
}

export default FullArticleCode;

