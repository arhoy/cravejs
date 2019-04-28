import React from 'react';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import FullArticleCode from './FullArticleCode';



const FullArticleRichText = ({nodeContent}) => {
  // this is the rtf node;
  const document = nodeContent;


  // Rendering options
   
      const Bold = ({ children }) => <span className="FullArticleRichText__bold">{children}</span>;
      const Underline = ({ children }) => <span className="FullArticleRichText__underline">{children}</span>;
      const Italic = ({ children }) => <span className="FullArticleRichText__italic">{children}</span>;


 
      console.log(['These are the marks',MARKS])
      console.log('These are the blocks',BLOCKS)
      console.log('These are the inlines',INLINES)
      const options = {

       
          renderMark: {
            [MARKS.UNDERLINE]: text => <Underline>{text}</Underline>,
            [MARKS.BOLD]: text => <Bold>{text}</Bold>,
            [MARKS.ITALICS]: text => <Italic>{text}</Italic>,
             
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
        
        if(node.content[0].value === ''){
          className = 'FullArticleRichText__padding';
        }

     
        //alternate logic for 'odd' | 'even'
        return className;
      }
    
  // black magic that contentful does when passing in the rtf document node abd the options defined above
  const rtf = documentToReactComponents(document,options);
      console.log(document);
      console.dir(rtf);

  return (
    <div>
          {rtf}
          <FullArticleCode/>
    </div>
  );
};

export default FullArticleRichText;