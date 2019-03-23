import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className = "Footer">
            <div className="Footer__container">
                <div className="Footer__items">
                    <ul>

                        <li><Link className = "Footer__link" to = "/">Sample Products</Link></li>
                        <li><Link className = "Footer__link" to = "/">About Us</Link></li>
                        <li><Link className = "Footer__link" to = "/">Contact</Link></li>
                    </ul>
                </div>
                <div className="Footer__items">
                    <ul>
                        <li><Link className = "Footer__link" to = "/">Learning</Link></li>
                        <li><Link className = "Footer__link" to = "/">Articles</Link></li>
                        <li><Link className = "Footer__link" to = "/">Resources</Link></li>
                        <li><Link className = "Footer__link" to = "/">Blog</Link></li>
                    </ul>
                </div>
                <div className="Footer__items">
                    <ul>
                        <li><Link className = "Footer__link" to = "/">Dashboard</Link></li>
                        <li><Link className = "Footer__link" to = "/">Network</Link></li>
                        <li><Link className = "Footer__link" to = "/">Profile</Link></li>
                    </ul>
                </div>
                <div className="Footer__items">
                    
                        <div className = "Footer__icon">
                            <span className = "Footer__icon-1" >C</span>
                            <span className = "Footer__icon-2" >js</span>
                        </div>

                         <div className = "Footer__blurb">
                           <div className = "Footer__blurb-1"> <span>CraveJs </span>© </div> 
                           <div>web and self development since 2017</div>  
                         </div>   
               
                </div>
        </div>
        </div>
    );
};

export default Footer;