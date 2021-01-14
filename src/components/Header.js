import React from 'react';
import {Link} from "react-router-dom";

class Header extends React.Component{
    render() {
        return (
            <div className="header">
                <div>
                    <img src="../public/Uber_Icon.png" alt="Uber Icon" />
                    <h2>Uber</h2>
                </div>
                <div class="dropdown">
                    <button class="dropdowBtn"></button>
                    <div class="dropdownList">
                        <Link to='/'>Home</Link>
                        <Link to='/'>Profile</Link>
                        <Link to='/'>Your Book</Link>
                        <Link to='/'>Favorites</Link>
                        <Link to='/'>Notifications</Link>
                        <Link to='/'>Setting</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;