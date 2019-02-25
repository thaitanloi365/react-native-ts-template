import React from "react";
import { Navigator } from "Navigation";
import { SplashScreen } from "Components";
import { Authentication } from "Services";
import RNSplashScreen from "react-native-splash-screen";

class Start extends React.Component {
  componentDidMount() {
    Authentication.createSession()
      .then(success => {
        RNSplashScreen.hide();
        setTimeout(() => Navigator.navTo("Home"), 500);
      })
      .catch(error => {
        RNSplashScreen.hide();
        setTimeout(() => Navigator.navTo("Authentication"), 500);
      });
  }

  render() {
    return <SplashScreen />;
  }
}

export default Start;
