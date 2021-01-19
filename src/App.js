import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home Page/Home';
import Booking from './containers/Booking Page/Booking';
import SignUp from './containers/Registration Page/SignUp';
import Login from './containers/Login Page/Login';
import ContactUs from './containers/ContactUs Page/ContactUs';
import HowItWorks from './containers/Static Pages/HowItWorks';
import Privacy from './containers/Static Pages/Privacy';
import {UserContext} from './components/User-context';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.changeUser = (value) => {
      this.setState({
        user: value.name,
        gender: value.gender,
      })
    }

    this.state = {
      user: "",
      gender: "",
      changeUser: this.changeUser,
    }
  }

  render() {
    return (
      <div className="width-100">
        <UserContext.Provider value={this.state}>
          <Header />
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route exact path="/login"><Login/></Route>
            <Route exact path="/signup"><SignUp/></Route>
            <Route exact path="/booking"><Booking/></Route>
            <Route exact path="/contactus"><ContactUs/></Route>
            <Route exact path="/how"><HowItWorks/></Route>
            <Route exact path="/privacy"><Privacy/></Route>
          </Switch>
          <Footer />
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;