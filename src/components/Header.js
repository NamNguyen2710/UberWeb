import React from 'react';
import {Link} from "react-router-dom";
import uberIco from "../images/Uber_Icon.png";
import Dropdown from './Dropdown';
import {UserContext} from './User-context'

class Header extends React.Component{
  render() {
    const user = this.context;
    return (
      <div className="header">
        <div className="flex">
          <div className="left-icon">
            <img src={uberIco} alt="Uber Icon" />
            <h2>Uber</h2>
          </div>
          {user.user && 
            <div className="userBox">
              {user.user}
            </div>
          }
          <Dropdown>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/'>Profile</Link></li>
            <li><Link to='/booking'>Your Book</Link></li>
            <li><Link to='/'>Favorites</Link></li>
            <li><Link to='/'>Notifications</Link></li>
            <li><Link to='/'>Setting</Link></li>
          </Dropdown>
        </div>
      </div>
    );
  }
}
Header.contextType = UserContext;

export default Header;