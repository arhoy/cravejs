import React from 'react';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import FullArticleCode from './FullArticleCode';

const FullArticleRichText = ({ nodeContent, language }) => {
  // this is the rtf node;
  const document = nodeContent;

  // Rendering options

  const Bold = ({ children }) => (
    <span className="FullArticleRichText__bold">{children}</span>
  );
  const Underline = ({ children }) => (
    <span className="FullArticleRichText__underline">{children}</span>
  );
  const Italic = ({ children }) => (
    <span className="FullArticleRichText__italic">{children}</span>
  );
  const Code = ({ children }) => (
    <span style = {{fontSize:'1.6rem'}} className="FullArticleRichText__code">{children}</span>
  );

  const options = {
    renderMark: {
      [MARKS.UNDERLINE]: text => <Underline>{text}</Underline>,
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      [MARKS.ITALICS]: text => <Italic>{text}</Italic>,
      [MARKS.CODE]: text => (
        <Code>
          {' '}
          <FullArticleCode language={language} code={text} />{' '}
        </Code>
      )
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={paragraphClass(node)}>{children}</p>
      )
    }
  };

  // For paragraph nodes that are empty apply this css style to it
  function paragraphClass(node) {
    let className;

    if (node.content[0].value === '') {
      className = 'FullArticleRichText__padding';
    }

    //alternate logic for 'odd' | 'even'
    return className;
  }

  // black magic that contentful does when passing in the rtf document node abd the options defined above
  const rtf = documentToReactComponents(document, options);


  return <div>{rtf}</div>;
};

export default FullArticleRichText;
