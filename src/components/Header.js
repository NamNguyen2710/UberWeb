import React from "react";
import router from "../router";
import { Link, useHistory } from "react-router-dom";
import Dropdown from "./Dropdown";
import { UserContext } from "./User-context";
import uberIco from "../images/Uber_Icon.png";
import maleIco from "../images/male-icon.png";
import femaleIco from "../images/female-icon.png";

function Header() {
  const history = useHistory();

  return (
    <div className="header">
      <div className="flex">
        <div
          className="left-icon"
          onClick={() => {
            history.push(router.HOME);
          }}
        >
          <img src={uberIco} alt="Uber Icon" />
          <h2>Uber</h2>
        </div>
        <div className="row">
          <UserContext.Consumer>
            {({ user, gender }) => {
              return (
                <>
                  {user && (
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
                  )}
                  <Dropdown>
                    <li>
                      <Link to={router.HOME}>Home</Link>
                    </li>
                    <li>
                      <Link to={router.BOOKING}>Your Book</Link>
                    </li>
                    {!user && (
                      <>
                        <li>
                          <Link to={router.LOGIN}>Log In</Link>
                        </li>
                        <li>
                          <Link to={router.SIGNUP}>Sign Up</Link>
                        </li>
                      </>
                    )}
                  </Dropdown>
                </>
              );
            }}
          </UserContext.Consumer>
        </div>
      </div>
    </div>
  );
}

export default Header;
