import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component{
    render() {
        return (
            <div className="footer">
                <div>
                    <div>2021 Uber Technologies Inc. All Rights Reserved</div>
                    <Link>Terms of Use</Link>
                    <Link>Legal Notices</Link>
                    <Link>Privacy & Security</Link>
                </div>
                <div>
                    <a href="https://www.facebook.com"><img src="../images/Fb_icon.png" alt="Fb_icon"/></a>
                    <a href="https://www.linkedin.com"><img src="../images/Linkedin_icon.png" alt="Linked_icon"/></a>
                    <a href="https://www.youtube.com"><img src="../images/youtube_icon.png" alt="Youtube_icon"/></a>
                </div>
            </div>
        );
    }
}

export default Footer;