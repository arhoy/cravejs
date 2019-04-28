import React, { Component } from 'react';
import Prism from "prismjs";
import '../../helpers/prism/prism.css';

class FullArticleCode extends Component {
    componentDidMount() {
        Prism.highlightAll()
    }
    
render() {
return (
    <div>
   
<div>
    <pre>
    <code className = "language-css">
    {
 ` 
    .whatever {
        font-size: 2rem;
    }
`
        
    }
        
    </code>
    </pre>
    <pre>
    <code className="language-sql">
    { 
    `
    SELECT * FROM Table
    `}
    </code>
    </pre>
</div>    

        {/* <div>
            <pre>
            <code className = "language-js">   
{
`

const bilbo = {
    firstName: 'Bilbo',
    lastName: 'Baggins',
    age: 32,
    occupation: 'Developer'
};

const lara = {
    firstName: 'Lara',
    lastName: 'Croft',
    age: 25,
    occupation: 'Assassin'
}

greeting.call(lara); // Hello this is Lara Croft
    
`
    }
                 
                    </code> </pre>
                </div>    */}
            </div>
        );
    }
}

export default FullArticleCode;