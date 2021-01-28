import React from "react";
import { UserContext } from "./components/User-context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Switch, Redirect } from "react-router-dom";
import router from "./router";
import Home from "./containers/HomePage/Home";
import Booking from "./containers/BookingPage/Booking";
import SignUp from "./containers/RegistrationPage/SignUp";
import Login from "./containers/LoginPage/Login";
import ContactUs from "./containers/ContactUsPage/ContactUs";
import HowItWorks from "./containers/StaticPages/HowItWorks";
import Privacy from "./containers/StaticPages/Privacy";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      gender: "",
    };

    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(value) {
    this.setState({
      user: value.name,
      gender: value.gender,
    });
  }

  render() {
    return (
      <div className="width-100">
        <UserContext.Provider
          value={{ ...this.state, changeUser: this.changeUser }}
        >
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to={router.HOME} />}
            />
            <Route exact path={router.HOME}>
              <Home />
            </Route>
            <Route exact path={router.LOGIN}>
              <Login />
            </Route>
            <Route exact path={router.SIGNUP}>
              <SignUp />
            </Route>
            <Route exact path={router.BOOKING}>
              <Booking />
            </Route>
            <Route exact path={router.BOOKING}>
              <ContactUs />
            </Route>
            <Route exact path={router.HOWITWORKS}>
              <HowItWorks />
            </Route>
            <Route exact path={router.PRIVACY}>
              <Privacy />
            </Route>
          </Switch>
          <Footer />
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
