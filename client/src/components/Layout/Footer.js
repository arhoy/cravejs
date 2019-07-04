import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';


const Footer = () => {
    const footerDate = moment();

    return (
        <div className = "Footer">
            <div className="Footer__container">
                <div className="Footer__items">
                        
                        <div className = "Footer__icon">
                            <span className = "Footer__icon-1" >C</span>
                            <span className = "Footer__icon-2" >js</span>
                        </div>

                        <div className = "Footer__blurb">
                        <div className = "Footer__blurb-1">© <span style = {{fontWeight:'bold'}}>CraveJs </span></div> 
                        <div> 
                            web & self development 2017-<Moment format = "YYYY">{footerDate}</Moment>.
                             All code <a className = "Footer__link" target = "_blank" href="https://opensource.org/licenses/MIT">MIT license</a> 
                        </div> 
                        </div>   
            
                </div>
                {/* <div className="Footer__items">
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
                </div> */}
            
        </div>
        </div>
    );
};

export default Footer;