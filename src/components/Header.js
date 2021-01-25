import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { UserContext } from "./User-context";
import uberIco from "../images/Uber_Icon.png";
import maleIco from "../images/male-icon.png";
import femaleIco from "../images/female-icon.png";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="flex">
          <div className="left-icon">
            <img src={uberIco} alt="Uber Icon" />
            <h2>Uber</h2>
          </div>
          <div className="row">
            <UserContext.Consumer>
              {({ user, gender }) => {
                if (user !== "") {
                  return (
                    <div className="userBox">
                      <div>
                        <div className="userName">{user}</div>
                        <div className="userScore">4.89★</div>
                      </div>
                      <img
                        src={gender === "male" ? maleIco : femaleIco}
                        alt="avatar-ico"
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              }}
            </UserContext.Consumer>
            <Dropdown>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Profile</Link>
              </li>
              <li>
                <Link to="/">Your Book</Link>
              </li>
              <li>
                <Link to="/">Favorites</Link>
              </li>
              <li>
                <Link to="/">Notifications</Link>
              </li>
              <li>
                <Link to="/">Setting</Link>
              </li>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
