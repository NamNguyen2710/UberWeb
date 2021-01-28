import React from "react";
import router from "../router";
import { Link } from "react-router-dom";
import fb_ico from "../images/Fb_icon.png";
import yt_ico from "../images/youtube_icon.png";
import linked_ico from "../images/Linkedin_icon.png";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="flex">
          <div className="termBox">
            <div>2021 Uber Technologies Inc. All Rights Reserved</div>
            <Link to={router.HOWITWORKS}>Terms of Use</Link>
            <Link to={router.HOME}>Legal Notices</Link>
            <Link to={router.PRIVACY}>Privacy & Security</Link>
          </div>
          <div className="iconBox">
            <a href="https://www.facebook.com">
              <img className="icon" src={fb_ico} alt="Fb_icon" />
            </a>
            <a href="https://www.linkedin.com">
              <img className="icon" src={yt_ico} alt="Linked_icon" />
            </a>
            <a href="https://www.youtube.com">
              <img className="icon" src={linked_ico} alt="Youtube_icon" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
