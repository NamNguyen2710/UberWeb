import React from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home Page/Home';
import Booking from './containers/Booking Page/Booking';
import SignUp from './containers/Registration Page/SignUp';
import Login from './containers/Login Page/Login';
import ContactUs from './containers/ContactUs Page/ContactUs';
import HowItWorks from './containers/Static Pages/HowItWorks';
import Privacy from './containers/Static Pages/Privacy';

class App extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default App;